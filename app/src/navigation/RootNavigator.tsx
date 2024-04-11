import React, {useCallback, useContext, useEffect, useState} from 'react';
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
import CreateEvent from '../pages/Event/CreateEvent.tsx';
import CreateModal from '../pages/Event/CreateModal.tsx';
import ViewEvent from '../pages/Event/ViewEvent.tsx';
import Home from '../pages/Home.tsx';
import OnboardingScreen from '../pages/OnboardingScreen.tsx';
import Profile from '../pages/Profile.tsx';
import {updateAccessToken} from '../services/authentication/authentication.services.ts';
import {Type, UserContext} from '../store/contexts/user.context.ts';
import {STATUS} from '../store/reducers/user.reducer.ts';
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
  const Stack = createNativeStackNavigator();

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingLoaded, setOnboardingLoaded] = useState(false);
  const {state, dispatch} = useContext(UserContext);

  const refreshAccessToken = useCallback(async () => {
    const response = await updateAccessToken();

    try {
      if (response.status === 200) {
        const {data} = response;

        dispatch({
          type: Type.LOGGED_IN_SUCCESSFUL,
          payload: {
            user: {
              id: data.user.id,
              name: data.user.name,
              phone: data.user.phone,
            },
            token: data.accessToken,
            expiresAt: new Date(data.expiresAt),
          },
        });
      } else {
        dispatch({
          type: Type.LOGIN_FAILED,
        });
      }
    } catch (err) {
      dispatch({
        type: Type.LOGIN_FAILED,
      });
    }
  }, [dispatch]);

  useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);

  useEffect(() => {
    let refreshAccessTokenTimerId: NodeJS.Timeout;

    if (state.isAuthenticated) {
      refreshAccessTokenTimerId = setTimeout(() => {
        refreshAccessToken();
      }, new Date(state.expiresAt).getTime() - Date.now() - 10 * 1000);
    }

    return () => {
      if (state.isAuthenticated && refreshAccessTokenTimerId) {
        clearTimeout(refreshAccessTokenTimerId);
      }
    };
  }, [dispatch, refreshAccessToken, state.expiresAt, state.isAuthenticated]);

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

    fetch().then(r => r);
  }, [dispatch]);

  useEffect(() => {
    console.log('status', state.status);
  }, [state.status]);

  if (
    !state ||
    state?.status === STATUS.PENDING ||
    state?.status === STATUS.LOADING ||
    !onboardingLoaded
  ) {
    return (
      <SafeAreaView style={{...Style.centered, ...Style.container, flex: 1}}>
        <View style={styles.loading}>
          <ActivityIndicator color={Colors.primary} size="large" />
        </View>
      </SafeAreaView>
    );
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

      {!state.isAuthenticated ? (
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
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'CreateEvent'}
            component={CreateEvent}
            options={{
              ...headerSettings,

              title: 'Новая встреча',
              headerLeft: GoBackButton,
              headerStyle: styles.header,
            }}
          />
          <Stack.Group
            screenOptions={{
              presentation: 'modal',
            }}>
            <Stack.Screen
              name={'CreateModal'}
              component={CreateModal}
              options={{
                ...headerSettings,
                title: 'Новая встреча',
              }}
            />
          </Stack.Group>
          <Stack.Screen
            name="ViewEvent"
            component={ViewEvent}
            options={({route}) => ({
              ...headerSettings,

              title: route.params?.event.name,
              headerLeft: GoBackButton,
              headerStyle: styles.header,
              headerRight: ShowMoreButton,
            })}
          />
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

    backgroundColor: Colors.background,
  },

  loading: {
    ...Style.centered,
    ...Style.container,
  },
});
