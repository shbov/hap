import React from 'react';
import {StyleSheet} from 'react-native';

import {Pagination} from 'react-native-snap-carousel';

import {Colors} from '../../styles/Style';
import {Item} from '../../types/Item';

type Props = {
  data: Item[];
  activeSlide: number;
};

export const CustomPagination = ({data, activeSlide}: Props) => {
  const styles = StyleSheet.create({
    dotStyle: {
      width: 10,
      height: 10,
      borderRadius: 16,
      backgroundColor: Colors.white,
      marginHorizontal: 0,
      paddingHorizontal: 0,
    },

    inactiveDotStyle: {
      backgroundColor: Colors.lightGrey,
    },
  });

  const settings = {
    dotStyle: styles.dotStyle,
    dotsLength: data.length,
    activeDotIndex: activeSlide,
    inactiveDotStyle: styles.inactiveDotStyle,
    inactiveDotOpacity: 1,
    inactiveDotScale: 1,
  };

  return <Pagination {...settings} />;
};
