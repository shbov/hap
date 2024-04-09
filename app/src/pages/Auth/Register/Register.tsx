import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, Text} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ImagePickerAsset} from 'expo-image-picker';

import Step1 from './Step1.tsx';
import Step2 from './Step2.tsx';
import Step3 from './Step3.tsx';
import Step4 from './Step4.tsx';
import GoBackButton from '../../../components/Buttons/GoBackButton.tsx';
import {headerSettings} from '../../../navigation/RootNavigator.tsx';
import {registerUserService} from '../../../services/authentication/authentication.services.ts';
import {Type, UserContext} from '../../../store/contexts/user.context.ts';
import {Colors, Style} from '../../../styles/Style.tsx';

export enum Steps {
  PHONE = 'RPhone',
  PASSWORD = 'RPassword',
  NAME = 'RName',
  PHOTO = 'RPhoto',
  FINAL = 'RFinal',
}

export interface Form {
  phone: string;
  password: string;
  name: string;
  photo?: ImagePickerAsset;
}

const Register = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const route = useRoute();
  const {dispatch} = useContext(UserContext);

  const [step, setStep] = useState<Steps>(Steps.PHONE);
  const [form, setForm] = useState<Form>({} as Form);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      if (step !== Steps.FINAL) {
        navigation.navigate(step as never);
      }
    } catch (e) {
      console.log(e);
    }
  }, [navigation, step]);

  const getKey = (newStep: Steps) => {
    if (newStep === Steps.PASSWORD) {
      return 'phone';
    }

    if (newStep === Steps.NAME) {
      return 'password';
    }

    if (newStep === Steps.PHOTO) {
      return 'name';
    }

    if (newStep === Steps.FINAL) {
      return 'photo';
    }

    return '';
  };

  const onSubmit = async (
    newStep: Steps,
    value: string | undefined | ImagePickerAsset,
  ) => {
    setForm({
      ...form,
      [getKey(newStep)]: value,
    });

    setStep(newStep);

    if (newStep === Steps.FINAL) {
      setSubmitting(true);
      await registerUserService(form)
        .then(async responseData => {
          if (responseData.status !== 200) {
            setSubmitting(false);
            return Alert.alert('Ошибка при регистрации', responseData.message, [
              {text: 'ОК'},
            ]);
          }

          const {data} = responseData;
          if (data.token) {
            await AsyncStorage.setItem('token', data.token);

            dispatch({
              type: Type.LOGGED_IN_SUCCESSFUL,
              payload: {
                user: {
                  id: data.user.id,
                  name: data.user.name,
                  phone: data.user.phone,
                },
                token: data.token,
                expiresAt: new Date(data.expiresAt),
              },
            });

            setSubmitting(false);
          } else {
            dispatch({
              type: Type.LOGIN_FAILED,
            });
          }
        })
        .catch(err => {
          setSubmitting(false);
          console.log(err);
          dispatch({
            type: Type.LOGIN_FAILED,
          });
        });
    }
  };

  const onUpload = (photo: ImagePickerAsset | undefined) => {
    setForm({...form, photo});
  };

  const routeName = getFocusedRouteNameFromRoute(route);
  useEffect(() => {
    if (!routeName) {
      return;
    }

    setStep(routeName);
  }, [routeName]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Steps.PHONE}
        children={() => <Step1 onSubmit={onSubmit} value={form.phone} />}
        options={{
          ...headerSettings,

          title: 'Введи номер телефона',
          headerLeft: GoBackButton,
          headerRight: () => <Text style={styles.step}>1/4</Text>,
          headerStyle: styles.header,
        }}
      />

      <Stack.Screen
        name={Steps.PASSWORD}
        children={() => <Step2 onSubmit={onSubmit} value={form.password} />}
        options={{
          ...headerSettings,

          title: 'Введи пароль',
          headerLeft: GoBackButton,
          headerRight: () => <Text style={styles.step}>2/4</Text>,
          headerStyle: styles.header,
        }}
      />

      <Stack.Screen
        name={Steps.NAME}
        children={() => <Step3 onSubmit={onSubmit} value={form.name} />}
        options={{
          ...headerSettings,

          title: 'Укажи имя',
          headerLeft: GoBackButton,
          headerRight: () => <Text style={styles.step}>3/4</Text>,
          headerStyle: styles.header,
        }}
      />

      <Stack.Screen
        name={Steps.PHOTO}
        children={() => (
          <Step4
            onSubmit={onSubmit}
            value={form.photo}
            onUpload={onUpload}
            submitting={submitting}
          />
        )}
        options={{
          ...headerSettings,

          title: 'Фотография',
          headerLeft: GoBackButton,
          headerRight: () => <Text style={styles.step}>4/4</Text>,
          headerStyle: styles.header,
        }}
      />
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

  step: {
    ...Style.text,

    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0.5,

    color: Colors.blue,
  },
});

export default Register;
