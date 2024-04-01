import React, {createContext} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

export interface UserState {
  id: string;
  name: string;
  email: string;
  phone: string;
  token: string;

  isAuthenticated: boolean;
  isLoading: boolean;
}

export const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  phone: '',
  token: '',

  isAuthenticated: false,
  isLoading: true,
};

export enum Type {
  LOGGED_IN_SUCCESSFUL = 'LOGGED_IN_SUCCESSFUL',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGGING = 'LOGGING',
}

export interface Action {
  type: Type;
  value?: UserState;
}

export interface Context {
  userState: UserState;
  dispatchUser: React.Dispatch<Action>;
}

const initial: Context = {
  userState: initialState,
  dispatchUser: () => {},
};

export const getUserData = async (): Promise<UserState | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return null;
    }

    const decoded = jwtDecode(token ?? '') as Omit<
      UserState,
      'isLoading' | 'isAuthenticated'
    >;
    if (decoded.id !== null) {
      return {
        isLoading: false,
        isAuthenticated: true,
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        phone: decoded.phone,
        token,
      };
    }
  } catch (e) {
    console.log(e);
  }

  return null;
};

export const UserContext = createContext<Context>(initial);
