import React, {Image, ImageSourcePropType, StyleSheet} from 'react-native';

import {scaleHeight} from '../../functions/scaleHeight';

type Props = {
  source: ImageSourcePropType;
  width: number;
};

const CustomImage = ({source, width}: Props) => {
  const styles = StyleSheet.create({
    img: {
      width: width,
      height: scaleHeight({
        source: source,
        desiredWidth: width,
      }),
    },
  });

  return <Image source={source} style={styles.img} />;
};

export default CustomImage;
