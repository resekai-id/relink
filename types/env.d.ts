/// <reference types="node" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;

      IP_HEADER_NAME?: string;
      UNREGISTERED_USER_LINK_EXPIRATION_DAYS: string;

      HCAPTCHA_SITE_KEY: string;
      HCAPTCHA_SECRET: string;

      INTERNAL_API_ACCESS_KEY: string;

      JWT_SECRET_KEY: string;

      DATABASE_URI: string;
    }
  }
}

export {};
