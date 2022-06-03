import {Action, createAction, PayloadAction} from '@reduxjs/toolkit';
import {StrictEffect, put, takeEvery, retry, call} from 'redux-saga/effects';

import {ShortenLinkPayload} from '../../../schemas/common/shortenLinkPayloadSchema';

import {shortenLink} from '../../../services/client/links';

import {
  ShortenLinkActionType,
  ShortenLinkActionError,
  ShortenLinkAction,
  LinksState,
} from './types';

export type ShortenLinkSagaPayload = ShortenLinkPayload & {linkStateID: keyof LinksState};

const shortenLinkPut = (action: ShortenLinkAction) => put<ShortenLinkAction>(action);

export const shortenLinkAction = createAction(
  'links/shortenLink',
  (payload: ShortenLinkSagaPayload) => ({payload})
);

export function* shortenLinkSaga({
  payload,
}: PayloadAction<
  ShortenLinkSagaPayload,
  typeof shortenLinkAction['type']
>): Generator<StrictEffect> {
  const {linkStateID} = payload;

  try {
    yield shortenLinkPut({
      type: ShortenLinkActionType.Pending,
      payload: {linkStateID},
    });

    const link = (yield call(shortenLink, payload)) as Awaited<ReturnType<typeof shortenLink>>;

    if (!link)
      return yield shortenLinkPut({
        type: ShortenLinkActionType.Error,
        payload: {
          linkStateID,
          error: ShortenLinkActionError.ShortenLinkError,
        },
      });

    const {success, ...sanitizedLink} = link;

    return yield shortenLinkPut({
      type: ShortenLinkActionType.Success,
      payload: {
        linkStateID,
        ...sanitizedLink,
      },
    });
  } catch (error: unknown) {
    console.error(error);

    return yield shortenLinkPut({
      type: ShortenLinkActionType.Error,
      payload: {
        linkStateID,
        error: ShortenLinkActionError.UnexpectedError,
      },
    });
  }
}

function* linksSagasHandler(): Generator<StrictEffect> {
  yield takeEvery(shortenLinkAction.type, shortenLinkSaga);
}

export default linksSagasHandler;
