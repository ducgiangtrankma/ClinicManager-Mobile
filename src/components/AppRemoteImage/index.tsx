import {CachedImage} from '@georstat/react-native-image-cache';
import React, {FC} from 'react';
import {ImageResizeMode, ImageStyle, StyleProp, StyleSheet} from 'react-native';

interface Props {
  uri: string;
  thumbnailUri: string;
  blurRadius?: number;
  style: StyleProp<ImageStyle>;
  thumbnailStyle?: ImageStyle;
  resizeMode?: ImageResizeMode;
}
export const AppRemoteImage: FC<Props> = ({
  uri,
  thumbnailUri,
  style,
  thumbnailStyle,
  resizeMode = 'cover',
}) => {
  return (
    <CachedImage
      source={uri}
      style={style}
      imageStyle={thumbnailStyle ?? style}
      resizeMode={resizeMode}
      thumbnailSource={thumbnailUri}
    />
  );
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
