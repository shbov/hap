import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import PrimaryButton from '../../components/Buttons/PrimaryButton.tsx';
import {Style} from '../../styles/Style.tsx';

const CreateModal = () => {
  const navigation = useNavigation();
  const createEvent = (type: string) => {
    navigation.goBack();
    navigation.navigate('CreateEvent', {
      type: type,
    });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.wrapper}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={styles.buttons}>
          <PrimaryButton
            title="С друзьями"
            onPress={() => createEvent('friends')}
            dark
          />
          <PrimaryButton
            title="По работе"
            onPress={() => createEvent('work')}
            dark
          />
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
