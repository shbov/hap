import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import Carousel from 'react-native-snap-carousel';

import CarouselCard from './CarouselCard';
import {CustomPagination} from './CustomPagination.tsx';
import {Style} from '../../styles/Style';
import {Item} from '../../types/Item';

type PropsType = {
  items: Item[];
};

const CarouselCards = ({items}: PropsType) => {
  const {width} = Dimensions.get('window');
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const settings = {
    autoplay: true,
    data: items,
    itemWidth: width,
    sliderWidth: width,
    // hasParallaxImages: false,
    onScrollIndexChanged: (index: number) => setSlideIndex(index),
    renderItem: CarouselCard,
  };

  return (
    <View style={style.margin}>
      <Carousel {...(settings as any)} />
      <CustomPagination data={items} activeSlide={slideIndex} />
    </View>
  );
};

const style = StyleSheet.create({
  margin: {
    marginHorizontal: -1 * Style.container.paddingHorizontal,
  },
});

export default CarouselCards;
