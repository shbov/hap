import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {Formik, useFormikContext} from 'formik';
import {FormikHelpers} from 'formik/dist/types';
import * as yup from 'yup';

import PrimaryButton from '../../components/Buttons/PrimaryButton.tsx';
import {Colors, Style} from '../../styles/Style.tsx';

const {width} = Dimensions.get('window');
const computedWidth = width - 2 * Style.container.paddingHorizontal;

interface Props {
  onSubmit: (
    values: State,
    formikHelpers: FormikHelpers<State>,
  ) => void | Promise<any>;
  buttonTitle: string;
}

export interface State {
  phone: string;
  password: string;
}

const HandleError = () => {
  const {isValid, isValidating, isSubmitting, touched, errors} =
    useFormikContext<State>();

  useEffect(() => {
    if (!isValid && !isValidating && isSubmitting) {
      if (errors.phone && touched.phone) {
        return Alert.alert('Ошибка', errors.phone);
      }

      if (errors.password && touched.password) {
        return Alert.alert('Ошибка', errors.password);
      }

      Alert.alert('Ошибка', 'Попробуйте еще раз');
    }
  }, [
    errors,
    errors.password,
    errors.phone,
    isSubmitting,
    isValid,
    isValidating,
    touched.password,
    touched.phone,
  ]);

  return null;
};

const Form = ({onSubmit, buttonTitle}: Props) => {
  return (
    <Formik
      style={styles.form}
      enableReinitialize={true}
      initialValues={{phone: '', password: ''} as State}
      onSubmit={onSubmit}
      validationSchema={yup.object().shape({
        phone: yup.string().phone('RU').required(),
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
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone}
            style={styles.input}
            placeholderTextColor={Colors.grey}
            autoComplete="tel"
            dataDetectorTypes="phoneNumber"
            inputMode="tel"
            keyboardType="phone-pad"
            enablesReturnKeyAutomatically={true}
            placeholder={'Телефон'}
          />

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
              title={isSubmitting ? <ActivityIndicator /> : buttonTitle}
              styles={styles.btn}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export const styles = StyleSheet.create({
  form: {...Style.centered},

  container: {
    ...Style.container,
    ...Style.centered,
    alignItems: 'center',
    marginBottom: 32,
    gap: 12,
    flex: 1,
  },

  bg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  agree: {
    ...Style.text,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.grey,

    textAlign: 'center',
  },

  input: {
    ...Style.centered,
    ...Style.shadow,

    backgroundColor: Colors.white,
    width: computedWidth,
    borderRadius: 100,

    paddingHorizontal: Style.container.paddingHorizontal,
    paddingVertical: 14,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 22,
    color: Colors.dark,
  },

  error: {
    ...Style.text,
    fontSize: 12,
    lineHeight: 16,

    color: Colors.danger,
  },

  btn: {
    width: computedWidth,
    borderRadius: 100,
    marginTop: 24,
  },

  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
  },
});

export default Form;
