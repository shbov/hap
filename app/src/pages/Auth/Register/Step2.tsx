import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {Formik, useFormikContext} from 'formik';
import * as yup from 'yup';

import {Steps} from './Register.tsx';
import PrimaryButton from '../../../components/Buttons/PrimaryButton.tsx';
import {Colors} from '../../../styles/Style.tsx';
import {styles as formStyles} from '../Form.tsx';

export interface State {
  password: string;
}

const HandleError = () => {
  const {isValid, isValidating, isSubmitting, touched, errors} =
    useFormikContext<State>();

  useEffect(() => {
    if (!isValid && !isValidating && isSubmitting) {
      if (errors.password && touched.password) {
        return Alert.alert('Ошибка', errors.password);
      }

      Alert.alert('Ошибка', 'Попробуйте еще раз');
    }
  }, [
    errors,
    errors.password,
    isSubmitting,
    isValid,
    isValidating,
    touched.password,
  ]);

  return null;
};

interface Props {
  onSubmit: (step: Steps, value: string) => void;
  value?: string;
}

export const Step2 = ({onSubmit, value}: Props) => {
  return (
    <SafeAreaView style={styles.main}>
      <Formik
        style={styles.form}
        enableReinitialize={true}
        initialValues={{password: value ?? ''} as State}
        onSubmit={(values, {setSubmitting}) => {
          onSubmit(Steps.NAME, values.password);
          setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          password: yup.string().required().min(8),
        })}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValidating,
          values,
        }) => (
          <View style={styles.container}>
            <TextInput
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              style={styles.input}
              placeholderTextColor={Colors.grey}
              inputMode="text"
              keyboardType="default"
              placeholder={'Пароль'}
            />

            <HandleError />
            <View style={styles.buttons}>
              <PrimaryButton
                dark
                disabled={isValidating || isSubmitting}
                onPress={handleSubmit}
                title={isSubmitting ? <ActivityIndicator /> : 'Далее'}
                styles={styles.btn}
              />
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...formStyles,

  main: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.white,
  },
});

export default Step2;
