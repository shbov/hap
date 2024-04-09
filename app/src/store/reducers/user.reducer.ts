import AsyncStorage from '@react-native-async-storage/async-storage';

import {Action, initialState, State} from '../contexts/user.context.ts';

export enum STATUS {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}

export const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOGGED_IN_SUCCESSFUL':
      AsyncStorage.setItem('token', action.payload.token);

      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        expiresAt: action.payload.expiresAt,
        isAuthenticated: true,
        verifyingToken: false,
        status: STATUS.SUCCEEDED,
      };

    case 'UPDATE_TOKEN':
      AsyncStorage.setItem('token', action.payload.token);

      return {
        ...state,
        token: action.payload.token,
        expiresAt: action.payload.expiresAt,
        isAuthenticated: true,
        verifyingToken: false,
        status: STATUS.SUCCEEDED,
      };

    case 'LOGOUT': {
      return {
        ...initialState,
        status: STATUS.IDLE,
      };
    }

    case 'UPDATE_USER': {
      return {
        ...state,
        user: action.payload.user,
      };
    }

    case 'STATUS': {
      return {
        ...state,
        status: action.payload.status,
      };
    }

    case 'LOGIN_FAILED': {
      return {
        ...state,
        status: STATUS.FAILED,
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
