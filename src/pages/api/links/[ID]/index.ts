import {Link, LinkAnalytics} from '@prisma/client';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime';
import {NextApiRequest, NextApiResponse} from 'next';

import prisma from '../../../../services/server/prisma';
import {verifySessionToken} from '../../../../services/server/session';

import type {ClientLink} from '../../link/shorten';

export enum LinkDetailError {
  MissingSession = 'MISSING_SESSION',
  InvalidSession = 'INVALID_SESSION',
  MissingLinkID = 'MISSING_LINK_ID',
  InvalidLinkID = 'INVALID_LINK_ID',
  Unauthorized = 'UNAUTHORIZED',
  UnexpectedError = 'UNEXPECTED_ERROR',
}

export type ClientAnalytics = Omit<LinkAnalytics, 'linkID' | 'ID'>;

export interface LinkDetail extends ClientLink {
  analytics: ClientAnalytics[];
}

export type LinkDetailResponse =
  | {success: true; link: LinkDetail}
  | {success: false; error: LinkDetailError};

const linkDetailRequestHandler = async (
  request: NextApiRequest,
  response: NextApiResponse<LinkDetailResponse>
) => {
  try {
    const sessionToken = request.cookies.session;

    if (!sessionToken)
      return response.status(400).json({success: false, error: LinkDetailError.MissingSession});

    const sessionUser = verifySessionToken(sessionToken);

    if (!sessionUser)
      return response.status(400).json({success: false, error: LinkDetailError.InvalidSession});

    const linkID = request.query.ID as unknown as string | undefined;

    if (!linkID)
      return response.status(400).json({success: false, error: LinkDetailError.MissingLinkID});

    const link = (await prisma.link.findUnique({
      where: {
        ID: linkID,
      },
      select: {
        ID: true,

        createdAt: true,
        createdBy: true,
        expiry: true,

        title: true,
        alias: true,
        destination: true,

        clicks: true,

        analytics: {
          select: {
            date: true,
            data: true,
          },
        },
      },
    })) as LinkDetail & {createdBy?: Link['createdBy']};

    if (!link)
      return response.status(400).json({success: false, error: LinkDetailError.InvalidLinkID});

    if (link.createdBy !== sessionUser.ID)
      return response.status(401).json({success: false, error: LinkDetailError.Unauthorized});

    delete link.createdBy;

    return response.status(200).json({success: true, link});
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2023')
      return response.status(400).json({success: false, error: LinkDetailError.InvalidLinkID});

    return response.status(500).json({success: false, error: LinkDetailError.UnexpectedError});
  }
};

export default linkDetailRequestHandler;
