import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';

import {ScreenStackProps} from 'react-native-screens';

import {Style} from '../../styles/Style.tsx';

interface ScreenProps {
  route: any;
}

const ViewEvent = ({route}: ScreenProps) => {
  const {event} = route.params;

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={styles.container}>
        <Text>123</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {flex: 1},
  container: {
    ...Style.container,
  },
});

export default ViewEvent;
