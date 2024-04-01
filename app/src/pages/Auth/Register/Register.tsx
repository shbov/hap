import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';

import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Step1 from './Step1.tsx';
import Step2 from './Step2.tsx';
import Step3 from './Step3.tsx';
import Step4 from './Step4.tsx';
import GoBackButton from '../../../components/Buttons/GoBackButton.tsx';
import {headerSettings} from '../../../navigation/RootNavigator.tsx';
import {Colors, Style} from '../../../styles/Style.tsx';

export enum Steps {
  PHONE = 'RPhone',
  PASSWORD = 'RPassword',
  NAME = 'RName',
  PHOTO = 'RPhoto',
}

interface Form {
  phone: string;
  password: string;
  name: string;
  photo?: any;
}

const Register = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const route = useRoute();

  const [step, setStep] = useState<Steps>(Steps.PHONE);
  const [form, setForm] = useState<Form>({} as Form);

  useEffect(() => {
    try {
      navigation.navigate(step);
    } catch (e) {
      console.log(e);
    }
  }, [navigation, step]);

  useEffect(() => {
    console.log(form);
  }, [form.password, form.phone, form.name, form.photo, form]);

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

    return 'photo';
  };

  const onSubmit = (newStep: Steps, value: string) => {
    setForm({
      ...form,
      [getKey(newStep)]: value,
    });

    setStep(newStep);
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
        children={() => <Step4 onSubmit={onSubmit} value={form.phone} />}
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
