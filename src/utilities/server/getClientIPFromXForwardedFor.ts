const getClientIPFromXForwardedFor = (headerValue: string): string | undefined =>
  headerValue
    .split(',')
    .map(rawIP => rawIP.trim())
    .map(IP => {
      if (IP.includes(':')) {
        const splitIP = IP.split(':');

        if (splitIP.length === 2) return splitIP[0];
      }

      return IP;
    })
    .find(IP => IP !== 'unknown');

export default getClientIPFromXForwardedFor;
