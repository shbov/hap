import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CustomImage from '../../components/Custom/CustomImage.tsx';
import {Colors, Style, StyleConstant} from '../../styles/Style.tsx';
import {Event} from '../../types/Event';
import {Gap} from '../Home.tsx';

const linkIcon = require('../../../assets/images/link.png');
const width =
  Dimensions.get('window').width - 2 * Style.container.paddingHorizontal;

interface ItemProps {
  item: Event | null;
  fullwidth?: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const Item = ({fullwidth, item, onPress}: ItemProps) => {
  if (!item) {
    return null;
  }

  const {name, description, link, background} = item;

  const computedWidth = fullwidth ? width : (width - Gap) / 2;

  return (
    <TouchableOpacity
      style={{
        ...styles.item,
        maxWidth: computedWidth,
        backgroundColor: background ?? Colors.primary,
      }}
      onPress={onPress}
      activeOpacity={StyleConstant.hover.opacity}>
      {link && <CustomImage source={linkIcon} width={20} />}
      <View style={styles.texts}>
        <Text style={styles.title}>{name}</Text>
        {description && <Text style={styles.desc}>{description}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    ...Style.item,
    ...Style.rounded,

    padding: 20,
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

export default Item;
