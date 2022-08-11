import {UserType} from '@prisma/client';
import {NextApiRequest, NextApiResponse} from 'next';
import {object, string, ValidationError} from 'yup';

import prisma from '../../../services/server/prisma';

import {handleAnalytics} from '../../../services/server/analytics';

import aliasSchema from '../../../schemas/common/aliasSchema';

export enum ResolveResponseError {
  InvalidRequest = 'INVALID_REQUEST',
  MissingAuthorization = 'MISSING_AUTHORIZATION',
  Unauthorized = 'UNAUTHORIZED',
  InvalidAlias = 'INVALID_ALIAS',
  UnassignedAlias = 'UNASSIGNED_ALIAS',
  UnexpectedError = 'UNEXPECTED_ERROR',
}

export type ResolveResponse =
  | {success: true; destination: string}
  | {success: false; error: ResolveResponseError}
  | {success: false; error: ResolveResponseError.InvalidRequest; message: string};

export interface ResolveRequestHeaders {
  [key: string]: string;

  authorization: string;
}

export interface ResolveRequestBody {
  alias: string;
  visitor: {
    referrer: string;
    deviceType?: string;
    country?: string;
  };
}

export interface ValidatedResolveRequest extends NextApiRequest {
  headers: ResolveRequestHeaders;
  body: ResolveRequestBody;
}

const resolveRequestSchema = object({
  headers: object({authorization: string().required()}),
  body: object({
    alias: string().required(),
    visitor: object({
      referrer: string().required(),
      deviceType: string(),
      country: string(),
    }),
  }),
});

const resolveRequestHandler = async (
  request: NextApiRequest,
  response: NextApiResponse<ResolveResponse>
) => {
  try {
    await resolveRequestSchema.validate(request);

    const requestAccessKey = (<ValidatedResolveRequest>request).headers.authorization.split(' ')[1];

    if (!requestAccessKey)
      return response
        .status(400)
        .json({success: false, error: ResolveResponseError.MissingAuthorization});

    if (requestAccessKey !== process.env.INTERNAL_API_ACCESS_KEY)
      return response.status(401).json({success: false, error: ResolveResponseError.Unauthorized});

    const {alias, visitor} = (<ValidatedResolveRequest>request).body;

    if (!aliasSchema.isValidSync(alias))
      return response.status(401).json({success: false, error: ResolveResponseError.InvalidAlias});

    const link = await prisma.link.update({
      where: {alias: alias.toLowerCase()},
      select: {ID: true, destination: true, creator: {select: {type: true}}},
      data: {clicks: {increment: 1}},
    });

    if (!link)
      return response
        .status(404)
        .json({success: false, error: ResolveResponseError.UnassignedAlias});

    if (link.creator.type === UserType.REGISTERED)
      // eslint-disable-next-line no-void
      void handleAnalytics(link.ID, visitor);

    return response.status(200).json({success: true, destination: link.destination});
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof ValidationError)
      return response.status(400).json({
        success: false,
        error: ResolveResponseError.InvalidRequest,
        message: error.errors[0] ?? 'Unknown error.',
      });

    return response.status(500).json({success: false, error: ResolveResponseError.UnexpectedError});
  }
};

export default resolveRequestHandler;
