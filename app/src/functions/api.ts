// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import {APP_BACKEND_URL} from '@env';

export const makeUrl = (...params: string[]) => {
  return [APP_BACKEND_URL, 'api', API_VERSION, ...params].join('/');
};

export const API_VERSION = 'v1';
export const ROUTES = {
  Login: makeUrl('auth/sign-in'),
  RefreshToken: makeUrl('auth/refresh-token'),
};
