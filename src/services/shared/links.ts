/* eslint-disable import/prefer-default-export */
import type {LinksResponse} from '../../pages/api/links';

import {LINK_LIST_ENDPOINT} from '../../constants/client/endpoints';

export const fetchLinkList = async (cursor?: string, APIOrigin?: string, headers?: HeadersInit) => {
  const response = await fetch(
    `${APIOrigin ?? ''}${LINK_LIST_ENDPOINT}${cursor ? `?cursor=${cursor}` : ''}`,
    {headers}
  );

  const responseBody = (await response.json()) as LinksResponse;

  if (!responseBody.success) throw new Error(responseBody.error);

  return responseBody.links;
};
