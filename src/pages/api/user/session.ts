import {NextApiRequest, NextApiResponse} from 'next';

import {User, UserType} from '@prisma/client';

import prisma from '../../../services/server/prisma';
import {
  createSessionCookie,
  createSessionTicket,
  createSessionToken,
  verifySessionToken,
} from '../../../services/server/session';

import getClientIP from '../../../utilities/server/getClientIP';

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

const clientSessionSelect = {
  ID: true,
  type: true,
  tier: true,
  IP: true,
  fingerprint: true,
};

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

    // not using the "request-ip" package as it's vulnerable to spoofing.
    const clientIP = getClientIP(request) || 'UNKNOWN';

    if (request.cookies.session) {
      let requestSession = verifySessionToken(request.cookies.session);

      if (requestSession) {
        if (requestSession.type === UserType.REGISTERED)
          return response.json({
            success: true,
            type: requestSession.type,
            tier: requestSession.tier,
          });

        const dataToUpdate: Partial<User> = {};

        if (requestSession.IP !== clientIP) dataToUpdate.IP = clientIP;

        if (requestSession.fingerprint !== clientFingerprint)
          dataToUpdate.fingerprint = clientFingerprint;

        if (dataToUpdate.IP || dataToUpdate.fingerprint) {
          const updatedSessionTicket = createSessionTicket(clientFingerprint, clientIP);

          try {
            requestSession = await prisma.user.update({
              where: {ID: requestSession.ID},
              data: {
                IP: clientIP,
                fingerprint: clientFingerprint,
                ticket: updatedSessionTicket,
              },
              select: clientSessionSelect,
            });
          } catch {
            requestSession = null;
          }

          if (requestSession)
            response.setHeader('Set-Cookie', createSessionCookie(updatedSessionTicket));
        }

        if (requestSession)
          return response.status(200).json({
            success: true,
            type: requestSession.type,
            tier: requestSession.tier,
          });
      }
    }

    const sessionTicket = createSessionTicket(clientFingerprint, clientIP);

    let user = await prisma.user.findFirst({
      where: {
        type: UserType.UNREGISTERED,
        ticket: sessionTicket,
      },
      select: clientSessionSelect,
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          IP: clientIP,
          fingerprint: clientFingerprint,
          ticket: sessionTicket,
        },
        select: clientSessionSelect,
      });
    }

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
