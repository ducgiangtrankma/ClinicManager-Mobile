import { useAppTheme } from '@src/common';
import React, { FC } from 'react';
import { ActivityIndicator } from 'react-native';

interface Props {
  animating: boolean;
}
export const AppActivityIndicator: FC<Props> = ({ animating }) => {
  const { Colors } = useAppTheme();
  return (
    <ActivityIndicator
      animating={animating}
      size={'large'}
      color={Colors.activityIndicatorColor}
    />
  );
};
