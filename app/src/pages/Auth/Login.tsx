import React, {useContext} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {FormikValues} from 'formik';
import {FormikHelpers} from 'formik/dist/types';
import 'yup-phone-lite';

import Form, {State} from './Form.tsx';
import {phoneFormat} from '../../functions/phoneFormat.ts';
import {loginUserService} from '../../services/authentication/authentication.services.ts';
import {Type, UserContext} from '../../store/contexts/user.context.ts';
import {Colors} from '../../styles/Style.tsx';

export const Login = () => {
  const {dispatchUser} = useContext(UserContext);

  const onSubmit = (
    values: FormikValues,
    {resetForm, setSubmitting}: FormikHelpers<State>,
  ) => {
    let userData: State = {
      phone: phoneFormat(values.phone),
      password: values.password,
    };

    setSubmitting(true);
    loginUserService(userData)
      .then(async responseData => {
        if (responseData.status !== 200) {
          setSubmitting(false);
          return Alert.alert('Ошибка при авторизации', responseData.message, [
            {text: 'ОК'},
          ]);
        }

        const {data} = responseData;
        if (data.token) {
          resetForm({});
          await AsyncStorage.setItem('token', data.token);

          dispatchUser({
            type: Type.LOGGED_IN_SUCCESSFUL,
            value: {
              id: data.id,
              name: data.name,
              email: data.email,
              phone: data.phone,
              token: data.token,

              isLoading: false,
              isAuthenticated: true,
            },
          });

          setSubmitting(false);
        } else {
          dispatchUser({
            type: Type.LOGIN_FAILED,
            value: {
              isLoading: true,
              isAuthenticated: false,
              id: '',
              name: '',
              email: '',
              phone: '',
              token: '',
            },
          });
        }
      })
      .catch(error => {
        console.error(error);
        setSubmitting(false);
        dispatchUser({
          type: Type.LOGIN_FAILED,
          value: {
            isLoading: true,
            isAuthenticated: false,
            id: '',
            name: '',
            email: '',
            phone: '',
            token: '',
          },
        });
      });
  };

  return (
    <SafeAreaView style={styles.main}>
      <Form onSubmit={onSubmit} buttonTitle="Войти в аккаунт" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.white,
  },
});

export default Login;
