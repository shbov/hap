import React, {useEffect, useState} from 'react';
import {
  GestureResponderEvent,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Item from './Event/Item.tsx';
import BottomNavigation from '../components/BottomNavigation/BottomNavigation.tsx';
import CustomImage from '../components/Custom/CustomImage.tsx';
import {getEvents} from '../services/event/event.services.ts';
import {Colors, Style, StyleConstant} from '../styles/Style.tsx';
import {Event} from '../types/Event';

const Section = {
  Upcoming: 'Предстоящие',
  Past: 'Прошедшие',
};

export const Gap = 16;

const Home = ({navigation}: NativeStackScreenProps<any>) => {
  const [items, setItems] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getEvents().then(r => {
      setItems(r.events);
      setLoading(false);
    });
  }, []);

  const onPress = (id: Event['id']) => {
    return (e: GestureResponderEvent) => {
      e.preventDefault();

      navigation.navigate('ViewEvent', {
        id,
      });
    };
  };

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <View style={styles.top}>
          <Text style={styles.title}>Мои события</Text>
          <TouchableOpacity activeOpacity={StyleConstant.hover.opacity}>
            <CustomImage
              source={require('../../assets/images/notify.png')}
              width={28}
            />
          </TouchableOpacity>
        </View>

        {/*<View style={styles.container}>*/}
        {/*  <Text style={styles.header}>{Section.Upcoming}</Text>*/}
        {/*</View>*/}

        {/*<View style={styles.grid}>*/}
        {/*  <Item*/}
        {/*    item={upcomingEvent}*/}
        {/*    fullwidth*/}
        {/*    onPress={onPress(upcomingEvent.id)}*/}
        {/*  />*/}
        {/*</View>*/}

        <View style={styles.container}>
          <Text style={styles.header}>{Section.Past}</Text>
        </View>

        <View style={styles.grid}>
          {items.map(item => {
            return (
              <Item item={item} key={item.id} onPress={onPress(item.id)} />
            );
          })}
        </View>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },

  container: {
    ...Style.container,
  },

  grid: {
    ...Style.container,

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',

    gap: Gap,
    marginBottom: 24,
  },

  header: {
    ...Style.text,

    fontSize: 23,
    fontWeight: 'bold',
    lineHeight: 26,
    letterSpacing: 0.38,

    color: Colors.dark,
  },

  top: {
    ...Style.container,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 24,
  },

  title: {
    ...Style.text,

    fontSize: 34,
    lineHeight: 41,
    fontWeight: 'bold',
    letterSpacing: -0.37,

    color: Colors.dark,
    textAlign: 'left',
  },
});

export default Home;
