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
  phone: string;
}

const HandleError = () => {
  const {isValid, isValidating, isSubmitting, touched, errors} =
    useFormikContext<State>();

  useEffect(() => {
    if (!isValid && !isValidating && isSubmitting) {
      if (errors.phone && touched.phone) {
        return Alert.alert('Ошибка', errors.phone);
      }

      Alert.alert('Ошибка', 'Попробуйте еще раз');
    }
  }, [
    errors,
    errors.phone,
    isSubmitting,
    isValid,
    isValidating,
    touched.phone,
  ]);

  return null;
};

interface Props {
  onSubmit: (step: Steps, value: string) => void;
  value?: string;
}

export const Step1 = ({onSubmit, value}: Props) => {
  return (
    <SafeAreaView style={styles.main}>
      <Formik
        style={styles.form}
        enableReinitialize={true}
        initialValues={{phone: value ?? ''} as State}
        onSubmit={(values, {setSubmitting}) => {
          onSubmit(Steps.PASSWORD, values.phone);
          setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          phone: yup.string().phone('RU').required(),
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
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              style={styles.input}
              autoComplete="tel"
              dataDetectorTypes="phoneNumber"
              inputMode="tel"
              keyboardType="phone-pad"
              placeholderTextColor={Colors.grey}
              enablesReturnKeyAutomatically={true}
              placeholder={'Телефон'}
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

export default Step1;
