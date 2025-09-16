import { DrawerActions, useNavigation } from '@react-navigation/native';
import { DrawerMenuIcon } from '@src/assets';
import { ACTIVE_OPACITY_TOUCH, sizes } from '@src/utils';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

interface Props {}
export const DrawerButton: FC<Props> = () => {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <TouchableOpacity
      onPress={openDrawer}
      hitSlop={{
        top: sizes._12sdp,
        left: sizes._12sdp,
        bottom: sizes._12sdp,
        right: sizes._12sdp,
      }}
      activeOpacity={ACTIVE_OPACITY_TOUCH}
    >
      <DrawerMenuIcon />
    </TouchableOpacity>
  );
};
