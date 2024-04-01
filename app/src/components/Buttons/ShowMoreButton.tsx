import React from 'react';
import {TouchableOpacity} from 'react-native';

import {StyleConstant} from '../../styles/Style.tsx';
import CustomImage from '../Custom/CustomImage.tsx';

const ShowMoreButton = () => (
  <TouchableOpacity
    onPress={() => null}
    activeOpacity={StyleConstant.hover.opacity}>
    <CustomImage
      source={require('../../../assets/images/dots.png')}
      width={28}
    />
  </TouchableOpacity>
);

export default ShowMoreButton;
