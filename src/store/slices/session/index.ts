import {createSlice} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper';

import type {RootState} from '../..';

import {
  SessionState,
  SessionStateStatus,
  InitializeSessionActionType,
  InitializeSessionSuccessAction,
  InitializeSessionErrorAction,
} from './types';

export * as sessionTypes from './types';
export * as sessionSagas from './sagas';

export const INITIAL_SESSION_STATE: SessionState = {status: SessionStateStatus.Idle};

export const sessionStatusLookup = {
  [SessionStateStatus.Fail]: -1,
  [SessionStateStatus.Idle]: 0,
  [SessionStateStatus.Pending]: 1,
  [SessionStateStatus.Ready]: 2,
};

// eslint-disable-next-line @typescript-eslint/ban-types
const sessionSlice = createSlice<SessionState, {}, 'session'>({
  name: 'session',
  initialState: INITIAL_SESSION_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(HYDRATE, (state, action: unknown) => {
        const {payload} = action as {payload: RootState};

        if (!payload.session) return state;

        const hydratedState = payload[sessionSlice.name];

        if (
          state.status === SessionStateStatus.Ready ||
          sessionStatusLookup[state.status] > sessionStatusLookup[hydratedState.status]
        )
          return state;

        return hydratedState;
      })
      .addCase(InitializeSessionActionType.Pending, _ => ({
        status: SessionStateStatus.Pending,
      }))
      .addCase(InitializeSessionActionType.Error, (_, action: InitializeSessionErrorAction) => ({
        status: SessionStateStatus.Fail,
        error: action.payload,
      }))
      .addCase(
        InitializeSessionActionType.Success,
        (_, action: InitializeSessionSuccessAction) => ({
          ...action.payload,
          status: SessionStateStatus.Ready,
        })
      );
  },
});

export const {actions: sessionActions} = sessionSlice;

export default sessionSlice;
