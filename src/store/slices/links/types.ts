import {Action} from '@reduxjs/toolkit';

import type {ClientLink} from '../../../pages/api/link/shorten';

export type {ClientLink};

export enum LinkStateStatus {
  Pending = 'PENDING',
  Ready = 'READY',
  Fail = 'FAIL',
}

export type LinkState =
  | {status: LinkStateStatus.Pending}
  | ({status: LinkStateStatus.Ready} & ClientLink)
  | {status: LinkStateStatus.Fail; error: string};

export type LinksState = {[key: string]: LinkState};

export enum ShortenLinkActionType {
  Pending = 'links/shortenLink/pending',
  Success = 'links/shortenLink/success',
  Error = 'links/shortenLink/error',
}

export enum ShortenLinkActionError {
  ShortenLinkError = 'Failed to shorten link - "shortenLink" returned non truthy.',
  UnexpectedError = 'Failed to shorten link - an uncaught error was thrown.',
}

export type ShortenLinkPendingAction = Action<ShortenLinkActionType.Pending> & {
  payload: {linkStateID: keyof LinksState};
};

export type ShortenLinkErrorAction = Action<ShortenLinkActionType.Error> & {
  payload: {linkStateID: keyof LinksState; error: ShortenLinkActionError};
};

export type ShortenLinkSuccessAction = Action<ShortenLinkActionType.Success> & {
  payload: {linkStateID: keyof LinksState} & ClientLink;
};

export type ShortenLinkAction =
  | ShortenLinkPendingAction
  | ShortenLinkErrorAction
  | ShortenLinkSuccessAction;
