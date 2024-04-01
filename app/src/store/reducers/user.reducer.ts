import {Action, UserState} from '../contexts/user.context.ts';

export const userReducer = (state: UserState, action: Action) => {
  switch (action.type) {
    case 'LOGGED_IN_SUCCESSFUL':
      return {
        ...state,
        ...action.value,
      };

    case 'LOGIN_FAILED':
      return {...state, isLoading: false};

    default:
      return state;
  }
};
