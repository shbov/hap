import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {Steps} from './Register.tsx';
import PrimaryButton from '../../../components/Buttons/PrimaryButton.tsx';
import {Colors, Style} from '../../../styles/Style.tsx';
import {styles as formStyles} from '../Form.tsx';

export interface State {
  photo: string;
}

interface Props {
  onSubmit: (step: Steps, value: string) => void;
  value?: string;
}

const {width} = Dimensions.get('window');
const computedWidth = width - 2 * Style.container.paddingHorizontal;

export const Step4 = ({onSubmit, value}: Props) => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.label}>Пожалуйста, загрузите свою фотографию</Text>
        <PrimaryButton
          title="Загрузить фото"
          styles={styles.btn}
          onPress={null}
          dark
        />
        <PrimaryButton
          title="Пропустить"
          styles={styles.btn}
          onPress={null}
          transparent
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...formStyles,

  label: {
    ...Style.text,

    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    letterSpacing: -0.078,
    color: Colors.grey,
    marginBottom: 24,
  },

  container: {
    ...Style.container,
    ...Style.centered,

    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },

  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  btn: {
    width: computedWidth,
  },
});

export default Step4;
