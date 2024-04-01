import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

const CreateModal = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView keyboardShouldPersistTaps="handled" />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default CreateModal;
