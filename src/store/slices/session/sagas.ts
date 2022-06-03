import {createAction} from '@reduxjs/toolkit';
import {StrictEffect, call, put, takeLatest, fork} from 'redux-saga/effects';

import {fetchSession} from '../../../services/client/session';

import getFingerprint from '../../../utilities/client/getFingerprint';

import {
  InitializeSessionActionType,
  InitializeSessionActionError,
  InitializeSessionAction,
} from './types';

const initalizeSessionPut = (action: InitializeSessionAction) =>
  put<InitializeSessionAction>(action);

export const initializeSessionAction = createAction('session/initializeSession');

export function* initializeSession(): Generator<StrictEffect> {
  try {
    yield initalizeSessionPut({type: InitializeSessionActionType.Pending});

    if (typeof window === 'undefined')
      return yield initalizeSessionPut({
        type: InitializeSessionActionType.Error,
        payload: InitializeSessionActionError.ServerSideEnviroment,
      });

    const fingerprint = (yield call(getFingerprint)) as Awaited<ReturnType<typeof getFingerprint>>;

    if (!fingerprint)
      return yield initalizeSessionPut({
        type: InitializeSessionActionType.Error,
        payload: InitializeSessionActionError.FingerprintFail,
      });

    const session = (yield call(fetchSession, fingerprint)) as Awaited<
      ReturnType<typeof fetchSession>
    >;

    if (!session)
      return yield initalizeSessionPut({
        type: InitializeSessionActionType.Error,
        payload: InitializeSessionActionError.TokenFail,
      });

    return yield initalizeSessionPut({
      type: InitializeSessionActionType.Success,
      payload: {
        type: session.type,
        tier: session.tier,
      },
    });
  } catch (error: unknown) {
    console.error(error);

    return yield initalizeSessionPut({
      type: InitializeSessionActionType.Error,
      payload: InitializeSessionActionError.UnexpectedError,
    });
  }
}

function* sessionSagasHandler(): Generator<StrictEffect> {
  yield fork(initializeSession);

  yield takeLatest(initializeSessionAction.type, initializeSession);
}

export default sessionSagasHandler;
