import Constants from 'expo-constants';

import {AppConfig} from '../../app.config';

const {API_URL} = Constants.manifest?.extra as AppConfig;

export const makeUrl = (...params: string[]) => {
  return [API_URL, 'api', API_VERSION, ...params].join('/');
};

export const API_VERSION = 'v1';
export const ROUTES = {
  Login: makeUrl('auth/sign-in'),
  RefreshToken: makeUrl('auth/refresh-token'),
};
