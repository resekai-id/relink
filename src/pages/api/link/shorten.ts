import {NextApiRequest, NextApiResponse} from 'next';
import {object, string, ValidationError} from 'yup';
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

export type ClientLink = Omit<Link, 'createdBy' | 'createdAt'> & {createdAt: string};

export type ShortenResponse =
  | {success: true; link: ClientLink}
  | {success: false; error: ShortenResponseError}
  | {success: false; error: ShortenResponseError.InvalidRequest; message: string};

export interface ValidatedShortenRequest extends NextApiRequest {
  body: ShortenLinkPayload;
}

export const generateLinkAlias = new ShortUniqueID({length: 7, dictionary: 'alphanum'});

const UNREGISTERED_USER_LINK_EXPIRATION = 604800000; // 7 DAYS

export const shortenRequestSchema = object({
  headers: object({'content-type': string().oneOf(['application/json']).required()}),
  body: shortenLinkPayloadSchema,
});

const shortenRequestHandler = async (
  request: NextApiRequest,
  response: NextApiResponse<ShortenResponse>
) => {
  try {
    await shortenRequestSchema.validate(request, {abortEarly: true});

    const sessionToken = request.cookies.session;

    if (!sessionToken)
      return response
        .status(401)
        .json({success: false, error: ShortenResponseError.MissingSessionToken});

    const sessionUser = verifySessionToken(sessionToken);

    if (!sessionUser)
      return response
        .status(400)
        .json({success: false, error: ShortenResponseError.InvalidSessionToken});

    const {destination, alias, token} = (<ValidatedShortenRequest>request).body;

    const clientIP = getClientIP(request);

    const isValidCaptchaToken =
      process.env.NODE_ENV === 'development' ? true : await verifyCaptchaToken(token, clientIP);

    if (!isValidCaptchaToken)
      return response
        .status(400)
        .json({success: false, error: ShortenResponseError.InvalidCaptchaToken});

    const expiry =
      sessionUser.type === UserType.REGISTERED
        ? '' // links created by registered users are never expired.
        : new Date(Date.now() + UNREGISTERED_USER_LINK_EXPIRATION); // links created by unregistered users expire after {{UNREGISTERED_LINK_EXPIRATION_DAYS}}.

    const linkAlias = alias || (generateLinkAlias() as string);

    const link = await prisma.link.create({
      data: {
        destination,
        expiry,
        alias: linkAlias.toLowerCase(),
        creator: {connect: {ID: sessionUser.ID}},
      },
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
      link: {
        ...link,
        createdAt: link.createdAt.toString(),
        alias: linkAlias,
      },
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof ValidationError)
      return response.status(400).json({
        success: false,
        error: ShortenResponseError.InvalidRequest,
        message: error.errors[0] ?? 'Unknown error.',
      });

    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002')
      return response
        .status(400)
        .json({success: false, error: ShortenResponseError.DuplicateAlias});

    return response.status(500).json({success: false, error: ShortenResponseError.UnexpectedError});
  }
};

export default shortenRequestHandler;
