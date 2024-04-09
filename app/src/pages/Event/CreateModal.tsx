import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import PrimaryButton from '../../components/Buttons/PrimaryButton.tsx';
import {Colors, Style} from '../../styles/Style.tsx';

const CreateModal = () => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.wrapper}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={styles.buttons}>
          <PrimaryButton title="С друзьями" onPress={null} dark />
          <PrimaryButton title="По работе" onPress={null} dark />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    ...Style.container,
    flex: 1,
  },

  buttons: {
    gap: 12,
  },
});

export default CreateModal;
