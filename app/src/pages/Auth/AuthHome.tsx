import React from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import PrimaryButton from '../../components/Buttons/PrimaryButton.tsx';
import {Colors, Style} from '../../styles/Style.tsx';

const {width} = Dimensions.get('window');
const computedWidth = width - 2 * Style.container.paddingHorizontal;

interface Props extends NativeStackScreenProps<any> {}

const AuthHome = (props: Props) => {
  const goLogin = () => {
    props.navigation.navigate('Login');
  };

  const goRegister = () => {
    props.navigation.navigate('Register');
  };

  return (
    <ImageBackground
      style={styles.bg}
      source={require('../../../assets/images/login-bg.png')}>
      <SafeAreaView style={styles.main}>
        <View style={styles.buttons}>
          <PrimaryButton onPress={goLogin} title="Войти" styles={styles.btn} />
          <PrimaryButton
            onPress={goRegister}
            title="Создать аккаунт"
            styles={styles.btn}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-end',

    ...Style.container,

    alignItems: 'center',
    marginBottom: 32,
    gap: 12,
  },

  bg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },

  btn: {
    width: computedWidth,
    borderRadius: 100,
  },

  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
  },
});

export default AuthHome;
