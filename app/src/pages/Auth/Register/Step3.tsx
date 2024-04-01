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
  name: string;
}

const HandleError = () => {
  const {isValid, isValidating, isSubmitting, touched, errors} =
    useFormikContext<State>();

  useEffect(() => {
    if (!isValid && !isValidating && isSubmitting) {
      if (errors.name && touched.name) {
        return Alert.alert('Ошибка', errors.name);
      }

      Alert.alert('Ошибка', 'Попробуйте еще раз');
    }
  }, [errors, errors.name, isSubmitting, isValid, isValidating, touched.name]);

  return null;
};

interface Props {
  onSubmit: (step: Steps, value: string) => void;
  value?: string;
}

export const Step3 = ({onSubmit, value}: Props) => {
  return (
    <SafeAreaView style={styles.main}>
      <Formik
        style={styles.form}
        enableReinitialize={true}
        initialValues={{name: value ?? ''} as State}
        onSubmit={(values, {setSubmitting}) => {
          onSubmit(Steps.PHOTO, values.name);
          setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          name: yup.string().required(),
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
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              style={styles.input}
              inputMode="text"
              keyboardType="default"
              placeholderTextColor={Colors.grey}
              placeholder={'Имя Фамилия'}
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

export default Step3;
