import {NextApiRequest, NextApiResponse} from 'next';

import {User} from '@prisma/client';

import prisma from '../../services/server/prisma';
import {
  createSessionCookie,
  createSessionTicket,
  createSessionToken,
  verifySessionToken,
} from '../../services/server/session';

import getClientIP from '../../utilities/server/getClientIP';

export type ClientSession = Pick<User, 'type' | 'tier'>;

export const enum SessionResponseError {
  UnexpectedError = 'UNEXPECTED_ERROR',
  MissingFingerprint = 'MISSING_FINGERPRINT',
  InvalidFingerprint = 'INVALID_FINGERPRINT',
  SessionTokenError = 'SESSION_TOKEN_ERROR',
}

export type SessionResponse =
  | ({success: true} & ClientSession)
  | {success: false; error: SessionResponseError};

const sessionRequestHandler = async (
  request: NextApiRequest,
  response: NextApiResponse<SessionResponse>
) => {
  try {
    if (!request.query.fingerprint)
      return response
        .status(400)
        .json({success: false, error: SessionResponseError.MissingFingerprint});

    const clientFingerprint = request.query.fingerprint;

    if (typeof clientFingerprint !== 'string')
      return response
        .status(400)
        .json({success: false, error: SessionResponseError.InvalidFingerprint});

    // not using the popular "request-ip" package as it's vulnerable to spoofing.
    const clientIP = getClientIP(request) || 'UNKNOWN';

    if (request.cookies.session) {
      const requestSession = verifySessionToken(request.cookies.session);

      if (requestSession) {
        const dataToUpdate: Partial<User> = {};

        if (requestSession.IP !== clientIP) dataToUpdate.IP = clientIP;

        if (requestSession.fingerprint !== clientFingerprint)
          dataToUpdate.fingerprint = clientFingerprint;

        if (dataToUpdate.IP || dataToUpdate.fingerprint) {
          const updatedSessionTicket = createSessionTicket(clientFingerprint, clientIP);

          await prisma.user.update({
            where: {ID: requestSession.ID},
            data: {
              IP: clientIP,
              fingerprint: clientFingerprint,
              ticket: updatedSessionTicket,
            },
          });

          response.setHeader('Set-Cookie', createSessionCookie(updatedSessionTicket));
        }

        return response.status(200).json({
          success: true,
          type: requestSession.type,
          tier: requestSession.tier,
        });
      }
    }

    const sessionTicket = createSessionTicket(clientFingerprint, clientIP);

    const user = await prisma.user.upsert({
      where: {ticket: sessionTicket},
      create: {
        IP: clientIP,
        fingerprint: clientFingerprint,
        ticket: sessionTicket,
      },
      update: {},
      select: {
        ID: true,
        type: true,
        tier: true,
        IP: true,
        fingerprint: true,
      },
    });

    const sessionToken = createSessionToken(user);

    if (!sessionToken)
      return response
        .status(500)
        .json({success: false, error: SessionResponseError.SessionTokenError});

    response.setHeader('Set-Cookie', createSessionCookie(sessionToken));

    return response.status(200).json({
      success: true,
      type: user.type,
      tier: user.tier,
    });
  } catch (error: unknown) {
    console.error(error);

    return response.status(500).json({success: false, error: SessionResponseError.UnexpectedError});
  }
};

export default sessionRequestHandler;
