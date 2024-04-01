import {StyleSheet} from 'react-native';

/**
 * Доступные цвета
 */
export const Colors = {
  primary: '#FF6F42',
  secondary: 'rgba(16, 24, 40, 0.5)',
  tertiary: 'rgba(16, 24, 40, 0.37)',

  purple: '#7476D8',
  dark: '#040404',
  blue: '#007AFF',

  white: '#fff',
  background: '#FBF9F5',
  backgroundDark: '#040404',

  lightGrey: 'rgba(255, 255, 255, .5)',
  grey: '#AEAEB2',

  danger: '#F7867E',
  backgroundAccent: 'rgba(245, 235, 229, 1)',
};

/**
 * Константы стилей
 */
export const StyleConstant = {
  paddingVertical: 16,

  hover: {
    opacity: 0.85,
  },

  viewScreen: {
    proMax: 428,
    pro: 375,
  },
};

/**
 * Стили по умолчанию
 */
export const Style = StyleSheet.create({
  container: {
    paddingHorizontal: StyleConstant.paddingVertical,
    marginTop: StyleConstant.paddingVertical,
  },

  button: {
    borderRadius: 10,
  },

  text: {
    fontStyle: 'normal',
  },

  centered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  shadow: {
    backgroundColor: Colors.white,
    shadowColor: Colors.dark,
    shadowRadius: 16,
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  item: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  rounded: {
    borderRadius: 12,
  },
});
