import React from 'react';
import {Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';

import {Colors, Style} from '../../styles/Style';

type Props = {
  titleStyle: Object;
  value: string | undefined;
  placeholder: string;
  onChangeText: (text: string) => void;
  error: string | undefined;
  type: string;
  onFinish?: () => void;
};

export const ErrorStyles = StyleSheet.create({
  error: {
    ...Style.text,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,

    color: Colors.danger,
    marginTop: 4,
  },
});

export const CustomTextInput = ({
  titleStyle,
  value,
  placeholder,
  onChangeText,
  error,
  type,
  onFinish,
}: Props) => {
  const handleSubmitEditing = () => {
    if (onFinish && typeof onFinish === 'function') {
      onFinish();
      return;
    }

    Keyboard.dismiss();
  };

  const autoFocus = type === 'title';
  return (
    <View>
      <TextInput
        selectionColor={Colors.primary}
        placeholderTextColor={Colors.grey}
        style={titleStyle}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value ?? ''}
        multiline={true}
        blurOnSubmit={true}
        onSubmitEditing={handleSubmitEditing}
        autoFocus={autoFocus}
        {...(onFinish && {returnKeyType: 'done'})}
      />

      {error && <Text style={ErrorStyles.error}>{error}</Text>}
    </View>
  );
};
