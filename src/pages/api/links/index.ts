import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../services/server/prisma';
import {verifySessionToken} from '../../../services/server/session';

import {ClientLink} from '../link/shorten';

export enum LinksError {
  InvalidRequest = 'INVALID_REQUEST',
  MissingSession = 'MISSING_SESSION',
  InvalidSession = 'INVALID_SESSION',
  UnexpectedError = 'UNEXPECTED_ERROR',
}

export type LinksResponse =
  | {success: true; links: ClientLink[]}
  | {success: false; error: LinksError};

const linksRequestHandler = async (
  request: NextApiRequest,
  response: NextApiResponse<LinksResponse>
) => {
  try {
    const sessionToken = request.cookies.session;

    if (!sessionToken)
      return response.status(400).json({success: false, error: LinksError.MissingSession});

    const sessionUser = verifySessionToken(sessionToken);

    if (!sessionUser)
      return response.status(400).json({success: false, error: LinksError.InvalidSession});

    const requestCursor = request.query.cursor;

    if (requestCursor && typeof requestCursor !== 'string')
      return response.status(400).json({success: false, error: LinksError.InvalidRequest});

    const links = await prisma.link.findMany({
      take: 8,
      ...(requestCursor ? {skip: 1, cursor: {ID: requestCursor}} : {}),
      where: {createdBy: sessionUser.ID},
      select: {
        ID: true,

        createdAt: true,
        expiry: true,

        title: true,
        alias: true,
        destination: true,

        clicks: true,
      },
    });

    return response.status(200).json({
      success: true,
      links,
    });
  } catch (error: unknown) {
    console.error(error);

    return response.status(500).json({success: false, error: LinksError.UnexpectedError});
  }
};

export default linksRequestHandler;
