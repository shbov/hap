import 'dotenv/config';

export interface AppConfig {
  APP_ENV: string;
  API_URL: string;
  ONBOARDING_KEY: string;
  ONBOARDING_SHOW_DEV: string;
}

export default {
  name: 'hap',
  version: '1.0.0',
  extra: {
    APP_ENV: process.env.APP_ENV,
    API_URL: process.env.API_URL,
    ONBOARDING_KEY: process.env.ONBOARDING_KEY,
    ONBOARDING_SHOW_DEV: process.env.ONBOARDING_SHOW_DEV,
  },
};
