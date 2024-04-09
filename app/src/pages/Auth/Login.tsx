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
  const {dispatch} = useContext(UserContext);

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

        const {token, user, expiresAt} = responseData.data;
        if (token) {
          resetForm({});
          await AsyncStorage.setItem('token', token);

          dispatch({
            type: Type.LOGGED_IN_SUCCESSFUL,
            payload: {
              user: {
                id: user.id,
                name: user.name,
                phone: user.phone,
              },
              token,
              expiresAt: new Date(expiresAt),
            },
          });

          setSubmitting(false);
        } else {
          dispatch({
            type: Type.LOGIN_FAILED,
          });
        }
      })
      .catch(error => {
        console.error(error);
        setSubmitting(false);
        dispatch({
          type: Type.LOGIN_FAILED,
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
