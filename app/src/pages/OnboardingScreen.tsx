import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import {ONBOARDING_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PrimaryButton from '../components/Buttons/PrimaryButton';
import CarouselCards from '../components/Carousel/CarouselCards';
import {Colors, Style} from '../styles/Style.tsx';
import {CarouselItem} from '../types/CarouselItem.ts';

export interface OnboardingProps {
  onPress: () => void;
}

const items: CarouselItem[] = [
  {
    title: 'Наполняй свою жизнь встречами с важными тебе людьми',
    src: require('../../assets/images/onboarding-1.png'),
  },
  {
    title: 'Организовывай события без потери времени и нервов',
    src: require('../../assets/images/onboarding-2.png'),
  },
  {
    title: 'Будь в эпицентре жизни',
    src: require('../../assets/images/onboarding-3.png'),
  },
];

const OnboardingScreen = ({onPress}: OnboardingProps) => {
  useEffect(() => {
    AsyncStorage.setItem(ONBOARDING_KEY, 'true');
  }, []);

  return (
    <SafeAreaView style={style.main}>
      <View style={style.container}>
        <View style={style.carousel}>
          <CarouselCards items={items} />
        </View>

        <View style={style.bottom}>
          <PrimaryButton
            title="Начать пользоваться"
            onPress={() => onPress()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  main: {
    backgroundColor: Colors.backgroundDark,
    flex: 1,
  },

  container: {
    ...Style.container,
    flex: 1,
  },

  carousel: {
    marginBottom: 'auto',
  },

  bottom: {
    display: 'flex',
    marginVertical: Style.container.paddingHorizontal,
  },
});

export default OnboardingScreen;
