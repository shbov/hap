import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import BottomNavigation from '../components/BottomNavigation/BottomNavigation.tsx';
import CustomImage from '../components/Custom/CustomImage.tsx';
import {declOfNum} from '../functions/declOfNum.ts';
import {getUserProfileDataService} from '../services/user/user.services.ts';
import {Colors, Style, StyleConstant} from '../styles/Style.tsx';
import {User} from '../types/User.ts';

const {API_URL} = process.env;
const {height} = Dimensions.get('window');

const getImage = (image?: string) => {
  return `${API_URL}/uploads/${image ?? 'default.jpg'}`;
};

interface Props {
  user: User;
  events: number;
  friends: number;
}

const Profile = () => {
  const [data, setData] = useState<Props>(null);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getUserProfileDataService().then(r => {
      setData({
        user: r.user,
        events: r.events,
        friends: r.friends,
      });
    });
  }, []);

  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          style={{...styles.avatar, height: height / 2}}
          source={{
            uri: getImage(data.user.image),
          }}
        />
      </View>

      <TouchableOpacity
        activeOpacity={StyleConstant.hover.opacity}
        style={{...styles.btn, top: insets.top}}
        onPress={() => navigation.navigate('Settings' as never)}>
        <CustomImage
          source={require('../../assets/images/settings.png')}
          width={28}
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.name}>{data.user.name}</Text>
        </View>
        <View style={styles.cards}>
          <View style={styles.card}>
            <Text style={styles.cardNumber}>{data.events}</Text>
            <Text style={styles.desc}>
              {declOfNum(data.events, ['Событие', 'События', 'Событий'])}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardNumber}>{data.friends}</Text>
            <Text style={styles.desc}>
              {declOfNum(data.friends, ['Друг', 'Друга', 'Друзей'])}
            </Text>
          </View>
        </View>
      </View>

      <View style={{...styles.bottom, paddingBottom: insets.bottom}}>
        <BottomNavigation />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  relative: {
    position: 'relative',
  },

  avatar: {
    width: '100%',
  },

  name: {
    ...Style.text,

    fontSize: 34,
    fontWeight: '600',
    lineHeight: 41,
    letterSpacing: 0.37400001287460327,
    color: Colors.dark,

    textAlign: 'center',
  },

  wrapper: {
    marginTop: -30,
    paddingTop: 40,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 1000,
    borderTopRightRadius: 1000,
  },

  btn: {
    position: 'absolute',
    top: 0,
    right: StyleConstant.paddingVertical,
    padding: 4,
    backgroundColor: '#04040433',
    borderRadius: 100,
  },

  bottom: {},

  cards: {
    ...Style.container,

    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 12,
  },

  card: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 16,
  },

  cardNumber: {
    ...Style.text,

    fontSize: 52,
    fontWeight: '700',
    lineHeight: 52,
    letterSpacing: 0.36,
    color: Colors.dark,
    textAlign: 'center',
  },

  desc: {
    ...Style.text,
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.38,
    color: Colors.darkGrey,
    textAlign: 'center',
  },
});

export default Profile;
