import {NextApiRequest, NextApiResponse} from 'next';
import {object, string} from 'yup';
import ShortUniqueID from 'short-unique-id';

import {Link, UserType} from '@prisma/client';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime';

import prisma from '../../../services/server/prisma';
import {verifySessionToken} from '../../../services/server/session';

import shortenLinkPayloadSchema, {
  ShortenLinkPayload,
} from '../../../schemas/common/shortenLinkPayloadSchema';
import {verifyCaptchaToken} from '../../../services/server/hCaptcha';
import getClientIP from '../../../utilities/server/getClientIP';

export const enum ShortenResponseError {
  InvalidRequest = 'INVALID_REQUEST',
  MissingSessionToken = 'MISSING_SESSION_TOKEN',
  InvalidSessionToken = 'INVALID_SESSION_TOKEN',
  InvalidCaptchaToken = 'INVALID_CAPTCHA_TOKEN',
  DuplicateAlias = 'DUPLICATE_ALIAS',
  UnexpectedError = 'UNEXPECTED_ERROR',
}

export interface ClientLink {
  ID: string;
  expiry?: Date;
  alias: string;
  destination: string;
}

export type ShortenResponse =
  | ({success: true} & ClientLink)
  | {success: false; error: ShortenResponseError};

export interface ValidatedShortenRequest extends NextApiRequest {
  body: ShortenLinkPayload;
}

export const generateLinkAlias = new ShortUniqueID({length: 7, dictionary: 'alphanum'});

const UNREGISTERED_USER_LINK_EXPIRATION = 7 * 24 * 60 * 60 * 1000;

export const shortenRequestSchema = object({
  headers: object({'content-type': string().oneOf(['application/json']).required()}),
  body: shortenLinkPayloadSchema,
});

const shortenRequestHandler = async (
  request: NextApiRequest,
  response: NextApiResponse<ShortenResponse>
) => {
  try {
    const isRequestValid = shortenRequestSchema.isValidSync(request);

    if (!isRequestValid)
      return response
        .status(400)
        .json({success: false, error: ShortenResponseError.InvalidRequest});

    const sessionToken = request.cookies.session;

    if (!sessionToken)
      return response
        .status(401)
        .json({success: false, error: ShortenResponseError.MissingSessionToken});

    const user = verifySessionToken(sessionToken);

    if (!user)
      return response
        .status(400)
        .json({success: false, error: ShortenResponseError.InvalidSessionToken});

    const {destination, alias, token} = (<ValidatedShortenRequest>request).body;

    const clientIP = getClientIP(request);

    const isValidCaptchaToken = await verifyCaptchaToken(token, clientIP);

    if (!isValidCaptchaToken)
      return response
        .status(400)
        .json({success: false, error: ShortenResponseError.InvalidCaptchaToken});

    const expiry =
      user.type === UserType.REGISTERED
        ? '' // links created by registered users are never expired.
        : new Date(Date.now() + UNREGISTERED_USER_LINK_EXPIRATION); // links created by unregistered users expire after {{UNREGISTERED_LINK_EXPIRATION_DAYS}}.

    const linkAlias = alias || (generateLinkAlias() as string);

    const link = await prisma.link.create({
      data: {
        destination,
        expiry,
        alias: linkAlias.toLowerCase(),
        creator: {connect: {ID: user.ID}},
      },
    });

    return response.status(200).json({
      success: true,
      ...link,
      alias: linkAlias,
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002')
      return response
        .status(400)
        .json({success: false, error: ShortenResponseError.DuplicateAlias});

    return response.status(500).json({success: false, error: ShortenResponseError.UnexpectedError});
  }
};

export default shortenRequestHandler;
