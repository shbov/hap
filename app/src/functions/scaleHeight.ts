import {Image, ImageSourcePropType} from 'react-native';

/**
 * Масштабирует высоту изображения
 * @param source - источник изображения
 * @param desiredWidth - желаемая ширина
 */
export const scaleHeight: ({
  source,
  desiredWidth,
}: {
  source: ImageSourcePropType;
  desiredWidth: number;
}) => number = ({source, desiredWidth}) => {
  const {width, height} = Image.resolveAssetSource(source);

  return (desiredWidth / width) * height;
};
