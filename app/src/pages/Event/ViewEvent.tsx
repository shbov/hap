import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';

import {Style} from '../../styles/Style.tsx';

const ViewEvent = () => {
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
