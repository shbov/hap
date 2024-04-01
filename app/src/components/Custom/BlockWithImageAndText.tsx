import React from 'react';
import {
  Dimensions,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CustomImage from './CustomImage';
import {Colors, Style} from '../../styles/Style';

type Props = {
  title: string;
  desc: string;
  source: ImageSourcePropType;
};

interface MyComponentState {}

export class BlockWithImageAndText extends React.Component<
  Props,
  MyComponentState
> {
  render() {
    const {width} = Dimensions.get('window');
    const computedWidth = width - 2 * Style.container.paddingHorizontal;

    const style = StyleSheet.create({
      empty: {
        ...Style.centered,
        ...Style.shadow,

        borderRadius: Style.button.borderRadius,
        backgroundColor: Colors.white,

        paddingVertical: 48,
        paddingHorizontal: Style.container.paddingHorizontal,

        overflow: 'hidden',
        width: computedWidth,
        marginBottom: 4,
      },

      title: {
        ...Style.centered,
        ...Style.text,

        fontWeight: '600',
        fontSize: 20,
        lineHeight: 30,
        color: Colors.dark,

        marginVertical: 8,
      },

      desc: {
        ...Style.centered,
        ...Style.text,

        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,

        color: Colors.dark,
      },
    });

    return (
      <View style={style.empty}>
        <CustomImage source={this.props.source} width={160} />
        <Text style={style.title}>{this.props.title}</Text>
        <Text style={style.desc}>{this.props.desc}</Text>
      </View>
    );
  }
}
