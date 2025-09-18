import { sizes } from '@src/utils';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { AppRemoteImage } from '../AppRemoteImage';
import { Box } from '../Box';
import { useAppTheme } from '@src/common';

interface Props {
  uri: string;
  size: number;
}
export const Avatar: FC<Props> = ({ uri, size }) => {
  const { Colors } = useAppTheme();
  if (uri === '' || uri === null || uri === undefined) {
    return (
      <Box
        style={{
          height: size,
          width: size,
          borderRadius: sizes._99sdp,
          borderWidth: sizes._1sdp,
          borderColor: Colors.grayBackground,
        }}
      />
    );
  }
  return (
    <AppRemoteImage
      uri={uri}
      thumbnailUri={uri}
      style={[
        styles.avatar,
        {
          height: size,
          width: size,
        },
      ]}
      resizeMode="cover"
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    borderRadius: sizes._99sdp,
  },
});
