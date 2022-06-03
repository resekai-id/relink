import {createSlice} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper';

import type {RootState} from '../..';

import {
  LinksState,
  LinkStateStatus,
  ShortenLinkActionType,
  ShortenLinkErrorAction,
  ShortenLinkPendingAction,
  ShortenLinkSuccessAction,
} from './types';

const INITIAL_LINKS_STATE: LinksState = {};

// eslint-disable-next-line @typescript-eslint/ban-types
const linksSlice = createSlice<LinksState, {}, 'links'>({
  name: 'links',
  initialState: INITIAL_LINKS_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(HYDRATE, (state, action: unknown) => {
        const {payload} = action as {payload: RootState};

        if (!payload.links) return state;

        const hydratedState = payload[linksSlice.name];

        const newState = {...state};

        Object.entries(hydratedState).forEach(([hydratedLinkID, hydratedLink]) => {
          const currentState = state[hydratedLinkID];

          if (
            currentState &&
            (currentState.status === LinkStateStatus.Ready ||
              hydratedLink.status !== LinkStateStatus.Ready)
          )
            return;

          newState[hydratedLinkID] = hydratedLink;
        });

        return newState;
      })
      .addCase(ShortenLinkActionType.Pending, (state, action: ShortenLinkPendingAction) => {
        const newState = {...state};

        newState[action.payload.linkStateID] = {status: LinkStateStatus.Pending};

        return newState;
      })
      .addCase(ShortenLinkActionType.Error, (state, action: ShortenLinkErrorAction) => {
        const newState = {...state};

        const {linkStateID, error} = action.payload;

        newState[linkStateID] = {
          status: LinkStateStatus.Fail,
          error,
        };

        return newState;
      })
      .addCase(ShortenLinkActionType.Success, (state, action: ShortenLinkSuccessAction) => {
        const newState = {...state};

        const {linkStateID, ...link} = action.payload;

        newState[linkStateID] = {
          status: LinkStateStatus.Ready,
          ...link,
        };

        return newState;
      });
  },
});

export default linksSlice;
