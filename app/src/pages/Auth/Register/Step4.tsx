import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import {ImagePickerAsset} from 'expo-image-picker';

import {Steps} from './Register.tsx';
import PrimaryButton from '../../../components/Buttons/PrimaryButton.tsx';
import {Colors, Style, StyleConstant} from '../../../styles/Style.tsx';
import {styles as formStyles} from '../Form.tsx';

export interface State {
  photo: string;
}

interface Props<T> {
  onSubmit: (step: Steps, value: T | undefined) => void;
  onUpload: (value: T | undefined) => void;
  value?: T;
  submitting: boolean;
}

const {width} = Dimensions.get('window');
const computedWidth = width - 2 * Style.container.paddingHorizontal;

const emptyImage = require('../../../../assets/images/noavatar.png');

export const Step4 = ({
  onSubmit,
  onUpload,
  value,
  submitting,
}: Props<ImagePickerAsset>) => {
  const [image, setImage] = useState<ImagePickerAsset | undefined>(value);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      onUpload(result.assets[0] ?? undefined);
    }
  };

  const submit = () => {
    onSubmit(Steps.FINAL, image);
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          activeOpacity={StyleConstant.hover.opacity}
          onPress={pickImage}>
          {!image ? (
            <Image source={emptyImage} style={styles.image} />
          ) : (
            <Image source={image} style={styles.image} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Пожалуйста, загрузите свою фотографию</Text>

        <PrimaryButton
          title="Создать аккаунт"
          styles={styles.btn}
          onPress={submit}
          disabled={!image || submitting}
          dark
        />

        <PrimaryButton
          title="Пропустить"
          styles={styles.btn}
          onPress={submit}
          disabled={submitting}
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

  image: {width: 224, height: 224, borderRadius: 1000, margin: 0},

  imageContainer: {
    // ...Style.container,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 64,
  },
});

export default Step4;
