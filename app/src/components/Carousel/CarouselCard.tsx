import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import {Colors, Style, StyleConstant} from '../../styles/Style';
import {CarouselItem} from '../../types/CarouselItem.ts';
import CustomImage from '../Custom/CustomImage';

type Props = {
  item: CarouselItem;
};

const CarouselCard = ({item}: Props) => {
  let {width} = Dimensions.get('window');

  const styles = StyleSheet.create({
    text: {
      ...Style.text,

      fontWeight: '500',
      fontSize: 20,
      lineHeight: 24,
      color: Colors.white,

      marginTop: 48,
      paddingHorizontal: Style.container.paddingHorizontal,
      textAlign: 'center',
    },
    container: {},
  });

  if (width > StyleConstant.viewScreen.proMax) {
    width = StyleConstant.viewScreen.proMax;
    styles.container = {
      ...Style.centered,
    };
  }

  return (
    <View style={styles.container}>
      <CustomImage source={item.src} width={width} />
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );
};

export default CarouselCard;
