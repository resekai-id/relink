import {HCAPTCHA_VERIFY_ENDPOINT} from '../../constants/server/endpoints';

export interface HCaptchaVerifyResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  credit?: boolean;
  'error-codes'?: string[];
}

// eslint-disable-next-line import/prefer-default-export
export const verifyCaptchaToken = async (token: string, clientIP?: string) => {
  try {
    const response = await fetch(
      `${HCAPTCHA_VERIFY_ENDPOINT}?secret=${
        process.env.HCAPTCHA_SECRET
      }&response=${token}&remoteip=${clientIP || ''}`
    );

    const responseBody = (await response.json()) as HCaptchaVerifyResponse;

    if (!responseBody.success) return false;

    return true;
  } catch (error: unknown) {
    console.error(error);

    return false;
  }
};
