import React, {createContext} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

import {STATUS} from '../reducers/user.reducer.ts';

export interface UserState {
  id: string;
  name: string;
  email: string;
  phone: string;
  token: string;
}

export interface State {
  user: UserState;
  token: string | null;
  expiresAt: string;
  isAuthenticated: boolean;
  status: STATUS;
}

export const initialState: State = {
  user: {
    id: '',
    name: '',
    email: '',
    phone: '',
    token: '',
  },

  token: null,
  expiresAt: '',
  isAuthenticated: false,
  status: STATUS.PENDING,
};

export enum Type {
  LOGGED_IN_SUCCESSFUL = 'LOGGED_IN_SUCCESSFUL',
  LOGIN_FAILED = 'LOGIN_FAILED',

  LOGOUT = 'LOGOUT',
  UPDATE_USER = 'UPDATE_USER',
  STATUS = 'STATUS',

  UPDATE_TOKEN = 'UPDATE_TOKEN',
}

export interface Action {
  type: Type;
  payload?: any;
}

export interface Context {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const initial: Context = {
  state: initialState,
  dispatch: () => {},
};

export const getUserData = async (): Promise<UserState | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return null;
    }

    const decoded = jwtDecode<UserState>(token);
    if (decoded.id !== null) {
      return {
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
