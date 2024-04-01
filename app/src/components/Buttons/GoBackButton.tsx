import React from 'react';
import {TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {HeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';

import {StyleConstant} from '../../styles/Style.tsx';
import CustomImage from '../Custom/CustomImage.tsx';

interface Props {
  goBack?: () => void;
}

const GoBackButton = ({goBack}: Props & HeaderBackButtonProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => (goBack ? goBack() : navigation.goBack())}
      activeOpacity={StyleConstant.hover.opacity}>
      <CustomImage
        source={require('../../../assets/images/goBack.png')}
        width={28}
      />
    </TouchableOpacity>
  );
};

export default GoBackButton;
