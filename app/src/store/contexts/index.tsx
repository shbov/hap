import React, {useMemo, useReducer} from 'react';

import {initialState, UserContext} from './user.context';
import {userReducer} from '../reducers/user.reducer.ts';

interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default ContextProvider;
