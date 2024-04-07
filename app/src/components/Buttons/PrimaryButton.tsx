import React from 'react';
import {StyleProp, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {Colors, Style, StyleConstant} from '../../styles/Style';

type ButtonProps = {
  title: string | React.ReactNode;
  onPress: any;
  styles?: StyleProp<any>;
  disabled?: boolean;
  dark?: boolean;
  transparent?: boolean;
};

const PrimaryButton = ({
  title,
  onPress,
  styles,
  disabled,
  dark,
  transparent = false,
}: ButtonProps) => {
  const getColor = () => {
    if (transparent) {
      return 'transparent';
    }

    return dark ? Colors.dark : Colors.white;
  };

  const style = StyleSheet.create({
    btn: {
      ...Style.centered,
      ...Style.shadow,

      paddingHorizontal: Style.container.paddingHorizontal,
      paddingVertical: 14,
      borderRadius: 100,
      backgroundColor: getColor(),

      ...styles,

      opacity: disabled ? 0.5 : 1,
    },

    text: {
      ...Style.text,

      fontWeight: '600',
      fontSize: 17,
      lineHeight: 22,
      color: dark ? Colors.white : Colors.dark,
    },
  });

  return (
    <TouchableOpacity
      style={style.btn}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={StyleConstant.hover.opacity}>
      {typeof title === 'string' ? (
        <Text style={style.text}>{title}</Text>
      ) : (
        title
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
