import React from 'react';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import {decode, encode} from 'base-64';

import {RootNavigator} from './src/navigation/RootNavigator.tsx';
import ContextProvider from './src/store/contexts';
import {Colors} from './src/styles/Style.tsx';

Sentry.init({
  dsn: 'https://bab3d0763318d1867bb2ef91ddc60d53@o4506218171793408.ingest.us.sentry.io/4507323354513408',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
  },
});

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

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <ContextProvider>
        <RootNavigator />
      </ContextProvider>
    </NavigationContainer>
  );
};

export default Sentry.wrap(App);
