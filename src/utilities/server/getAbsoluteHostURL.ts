import {IncomingMessage} from 'http';

const getAbsoluteHostURL = (request: IncomingMessage) => {
  let host = (request?.headers ? request.headers.host : window.location.host) || 'localhost:3000';
  let protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:';

  if (
    request &&
    request.headers['x-forwarded-host'] &&
    typeof request.headers['x-forwarded-host'] === 'string'
  ) {
    host = request.headers['x-forwarded-host'];
  }

  if (
    request &&
    request.headers['x-forwarded-proto'] &&
    typeof request.headers['x-forwarded-proto'] === 'string'
  ) {
    protocol = `${request.headers['x-forwarded-proto']}:`;
  }

  return {
    protocol,
    host,
    origin: `${protocol}//${host}`,
  };
};

export default getAbsoluteHostURL;
