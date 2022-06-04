import FingerprintJS from '@fingerprintjs/fingerprintjs';

const getFingerprint = async (): Promise<string | null> => {
  try {
    const fingerprintJS = await FingerprintJS.load({monitoring: false});

    const userFingerprint = await fingerprintJS.get();

    return userFingerprint.visitorId;
  } catch (error: unknown) {
    console.error(error);

    return null;
  }
};

export default getFingerprint;
