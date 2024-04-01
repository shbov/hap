import React, {useMemo, useReducer} from 'react';

import {initialState, UserContext} from './user.context';
import {userReducer} from '../reducers/user.reducer';

interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider
      value={useMemo(
        () => ({userState: state, dispatchUser: dispatch}),
        [state],
      )}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
