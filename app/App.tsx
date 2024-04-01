import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

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

AsyncStorage.clear();

const App = () => (
  <NavigationContainer theme={MyTheme}>
    <ContextProvider>
      <RootNavigator />
    </ContextProvider>
  </NavigationContainer>
);

export default App;
