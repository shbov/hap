import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Colors, Style, StyleConstant} from '../../styles/Style.tsx';
import CustomImage from '../Custom/CustomImage.tsx';

const BottomNavigation = () => {
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    bottom: {
      ...Style.container,

      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    icon: {
      paddingVertical: 0,
      paddingHorizontal: 8,
    },

    add: {
      ...Style.centered,
      borderRadius: 100,

      paddingVertical: 12,
      paddingHorizontal: 32,

      backgroundColor: Colors.primary,
    },
  });

  return (
    <View style={styles.bottom}>
      <TouchableOpacity
        style={styles.icon}
        activeOpacity={StyleConstant.hover.opacity}
        onPress={() => {
          // @ts-ignore
          navigation.navigate('Home');
        }}>
        <CustomImage
          source={require('../../../assets/images/list.png')}
          width={32}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.add}
        onPress={() => {
          // @ts-ignore
          navigation.navigate('CreateModal');
        }}
        activeOpacity={StyleConstant.hover.opacity}>
        <CustomImage
          source={require('../../../assets/images/plus.png')}
          width={16}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.icon}
        activeOpacity={StyleConstant.hover.opacity}
        onPress={() => {
          // @ts-ignore
          navigation.navigate('Profile');
        }}>
        <CustomImage
          source={require('../../../assets/images/profile.png')}
          width={32}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;
