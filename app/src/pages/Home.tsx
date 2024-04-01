import React from 'react';
import {
  Dimensions,
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

import BottomNavigation from '../components/BottomNavigation/BottomNavigation.tsx';
import CustomImage from '../components/Custom/CustomImage.tsx';
import {Colors, Style, StyleConstant} from '../styles/Style.tsx';

const Section = {
  Upcoming: 'Предстоящие',
  Past: 'Прошедшие',
};

const Gap = 16;
const linkIcon = require('../../assets/images/link.png');

const _items = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Обсуждаем проект',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Марафон Гарри Поттера',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '1-2-1 синк',
  },
  {
    id: '68694a0f-3da1-471f-bd96-145571e29d72',
    title: '1-2-1 синк',
  },
  {
    id: '58694a0f-5da1-471f-bd96-145571e29d72',
    title: '1-2-1 синк',
  },
  {
    id: '58694a0f-3da1-471ffbd96-145571e29d72',
    title: '1-2-1 синк',
  },
  {
    id: '58694a0f-3da1-471f-bd9b-145571e29d72',
    title: '1-2-1 синк',
  },
  {
    id: '58694a0f-3da1-471a-bd96-145571e29d72',
    title: '1-2-1 синк',
  },
];

type ItemProps = {
  id: string;
  title: string;
  description?: string;
  fullwidth?: boolean;
  link?: string;
  background?: string;
};

type onPressProp = {onPress: (event: GestureResponderEvent) => void};

const Item = ({
  title,
  description,
  fullwidth,
  link,
  background,
  onPress,
}: ItemProps & onPressProp) => {
  const width =
    Dimensions.get('window').width - 2 * Style.container.paddingHorizontal;

  const computedWidth = fullwidth ? width : (width - Gap) / 2;

  const styles = StyleSheet.create({
    item: {
      ...Style.item,
      ...Style.rounded,

      backgroundColor: background ?? Colors.primary,
      padding: 20,
      maxWidth: computedWidth,
      width: '100%',
      height: 216,

      display: 'flex',
      justifyContent: 'space-between',
    },

    title: {
      ...Style.text,

      fontSize: 22,
      lineHeight: 22,
      fontWeight: 'bold',
      letterSpacing: 0.36,

      color: Colors.white,
    },

    desc: {
      ...Style.text,

      fontSize: 16,
      lineHeight: 18,
      fontWeight: '500',
      letterSpacing: -0.32,

      color: Colors.white,
      marginTop: 4,
    },

    texts: {
      marginTop: 'auto',
    },
  });

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      activeOpacity={StyleConstant.hover.opacity}>
      {link && <CustomImage source={linkIcon} width={20} />}
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.desc}>{description}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const Home = ({navigation}: NativeStackScreenProps<any>) => {
  const onPress = (event: ItemProps) => {
    return (e: GestureResponderEvent) => {
      e.preventDefault();
      //

      navigation.navigate('ViewEvent', {
        event,
      });
    };
  };

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

        <View style={styles.container}>
          <Text style={styles.header}>{Section.Upcoming}</Text>
        </View>

        <View style={styles.grid}>
          <Item
            title={_items[0].title}
            fullwidth
            onPress={onPress(_items[0])}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.header}>{Section.Past}</Text>
        </View>

        <View style={styles.grid}>
          {_items.map((item, id) => {
            return <Item title={item.title} key={id} onPress={onPress(item)} />;
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
