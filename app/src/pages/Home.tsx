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
const getUpcomingEvent = (events: Event[]) => {
  return events.find(
    e => new Date(e?.chosen_interval?.started_at ?? 0) > new Date(),
  );
};

const Home = ({navigation}: NativeStackScreenProps<any>) => {
  const [items, setItems] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [upcomingEvent, setUpcomingEvent] = useState<Event | undefined>(
    undefined,
  );

  useEffect(() => {
    setLoading(true);
    getEvents().then(r => {
      const events = r.events;
      setUpcomingEvent(getUpcomingEvent(events));
      setItems(events.filter(e => e.id !== upcomingEvent?.id));
      setLoading(false);
    });
  }, []);

  const onPress = (event: Event | undefined) => {
    return (e: GestureResponderEvent) => {
      e.preventDefault();
      if (!event) {
        return;
      }

      navigation.navigate('ViewEvent', {
        event,
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

        {upcomingEvent && (
          <>
            <View style={styles.container}>
              <Text style={styles.header}>{Section.Upcoming}</Text>
            </View>

            <View style={styles.grid}>
              <Item
                item={upcomingEvent}
                fullwidth
                onPress={onPress(upcomingEvent)}
              />
            </View>
          </>
        )}

        <View style={styles.container}>
          <Text style={styles.header}>{Section.Past}</Text>
        </View>

        <View style={styles.grid}>
          {items.map(item => {
            return <Item item={item} key={item.id} onPress={onPress(item)} />;
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
