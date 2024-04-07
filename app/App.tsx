import React from 'react';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {decode, encode} from 'base-64';

import {RootNavigator} from './src/navigation/RootNavigator.tsx';
import ContextProvider from './src/store/contexts';
import {Colors} from './src/styles/Style.tsx';

const MyTheme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

// AsyncStorage.clear();

const App = () => (
  <NavigationContainer theme={MyTheme}>
    <ContextProvider>
      <RootNavigator />
    </ContextProvider>
  </NavigationContainer>
);

export default App;
