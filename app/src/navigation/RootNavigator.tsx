import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';

// eslint-disable-next-line import/no-unresolved
import {APP_ENV, ONBOARDING_KEY, ONBOARDING_SHOW_DEV} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GoBackButton from '../components/Buttons/GoBackButton.tsx';
import ShowMoreButton from '../components/Buttons/ShowMoreButton.tsx';
import AuthHome from '../pages/Auth/AuthHome.tsx';
import Login from '../pages/Auth/Login.tsx';
import Register from '../pages/Auth/Register/Register.tsx';
import CreateModal from '../pages/Event/CreateModal.tsx';
import ViewEvent from '../pages/Event/ViewEvent.tsx';
import Home from '../pages/Home.tsx';
import OnboardingScreen from '../pages/OnboardingScreen.tsx';
import {
  getUserData,
  Type,
  UserContext,
} from '../store/contexts/user.context.ts';
import {Colors, Style} from '../styles/Style.tsx';

export const headerSettings = {
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  headerTintColor: Colors.dark,

  headerStyle: {
    backgroundColor: Colors.background,
  },

  headerTitleStyle: {
    ...Style.text,
    fontWeight: '500',
  },
};

export const RootNavigator = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingLoaded, setOnboardingLoaded] = useState(false);
  const {userState, dispatchUser} = useContext(UserContext);

  useEffect(() => {
    const fetch = async () => {
      if (APP_ENV === 'dev' && ONBOARDING_SHOW_DEV === 'true') {
        await AsyncStorage.removeItem(ONBOARDING_KEY);
      }

      try {
        const isFirstTime = await AsyncStorage.getItem(ONBOARDING_KEY);
        if (!isFirstTime) {
          setShowOnboarding(true);
        }

        setOnboardingLoaded(true);
      } catch (e) {
        console.error(e);

        setOnboardingLoaded(true);
        setShowOnboarding(false);
      }
    };
    const fetch2 = async () => {
      const value = await getUserData();
      if (!value) {
        return dispatchUser({
          type: Type.LOGIN_FAILED,
        });
      }

      dispatchUser({
        type: Type.LOGGED_IN_SUCCESSFUL,
        value,
      });
    };

    fetch();
    fetch2();
    // eslint-disable-next-line
  }, [])

  if (userState.isLoading) {
    return (
      <SafeAreaView style={{...Style.centered, ...Style.container, flex: 1}}>
        <View style={styles.loading}>
          <ActivityIndicator color={Colors.primary} size="large" />
        </View>
      </SafeAreaView>
    );
  }

  const Stack = createNativeStackNavigator();

  if (!onboardingLoaded) {
    return null;
  }

  return (
    <Stack.Navigator>
      {showOnboarding && (
        <Stack.Screen
          name="Onboarding"
          children={() => (
            <OnboardingScreen onPress={() => setShowOnboarding(false)} />
          )}
          options={{headerShown: false}}
        />
      )}

      {!userState.isAuthenticated ? (
        <>
          <Stack.Screen
            name="AuthHome"
            component={AuthHome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              ...headerSettings,

              title: 'Войти в аккаунт',
              headerLeft: GoBackButton,
              headerStyle: styles.header,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ViewEvent"
            component={ViewEvent}
            options={({route}) => ({
              ...headerSettings,

              title: route.params?.event.title,
              headerLeft: GoBackButton,
              headerStyle: styles.header,
              headerRight: ShowMoreButton,
            })}
          />
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen
              name={'CreateEvent'}
              component={CreateModal}
              options={{
                ...headerSettings,
                title: 'Новая встреча',
              }}
            />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    ...Style.text,

    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: -0.408,

    color: Colors.dark,
  },

  loading: {
    ...Style.centered,
    ...Style.container,
  },
});
