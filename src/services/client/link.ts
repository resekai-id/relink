import type {ShortenResponse} from '../../pages/api/link/shorten';

import type {ShortenLinkPayload} from '../../schemas/common/shortenLinkPayloadSchema';

import {SHORTEN_LINK_ENDPOINT} from '../../constants/client/endpoints';

// eslint-disable-next-line import/prefer-default-export
export const shortenLink = async (link: ShortenLinkPayload) => {
  const response = await fetch(SHORTEN_LINK_ENDPOINT, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(link),
  });

  const responseBody = (await response.json()) as ShortenResponse;

  if (!responseBody.success) throw new Error(responseBody.error);

  return responseBody.link;
};
