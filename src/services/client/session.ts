import type {SessionResponse} from '../../pages/api/session';

import {SESSION_ENDPOINT} from '../../constants/client/endpoints';

// eslint-disable-next-line import/prefer-default-export
export const fetchSession = async (fingerprint: string) => {
  const response = await fetch(
    `${SESSION_ENDPOINT}?seed=${encodeURIComponent(fingerprint)}`
  );

  const responseBody = (await response.json()) as SessionResponse;

  if (!responseBody.success) throw new Error(responseBody.error);

  return responseBody;
};
