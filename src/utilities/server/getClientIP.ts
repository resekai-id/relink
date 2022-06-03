import {NextApiRequest} from 'next';

import getClientIPFromXForwardedFor from './getClientIPFromXForwardedFor';

const {IP_HEADER_NAME} = process.env;

const getClientIP = (request: NextApiRequest) => {
  if (!IP_HEADER_NAME || !request.headers[IP_HEADER_NAME])
    return request.socket.remoteAddress || request.connection.remoteAddress;

  const IPHeaderValue =
    typeof (<string | string[]>request.headers[IP_HEADER_NAME]) === 'string'
      ? <string>request.headers[IP_HEADER_NAME]
      : (<string[]>request.headers[IP_HEADER_NAME]).join(',');

  if (IP_HEADER_NAME === 'x-forwarded-for')
    return getClientIPFromXForwardedFor(IPHeaderValue) ?? undefined;

  return IPHeaderValue;
};

export default getClientIP;
