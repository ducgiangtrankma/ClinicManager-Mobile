import { PlusIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import { useTabActions } from '@src/common/hooks/useTabActions';
import { sizes } from '@src/utils';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  currentTab?: string;
}

export const TabbarPlusButton: FC<Props> = ({ currentTab }) => {
  const { Colors } = useAppTheme();
  const { getActionForTab } = useTabActions();

  const handlePress = () => {
    if (currentTab) {
      const tabAction = getActionForTab(currentTab);
      tabAction.action();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.plusButton,
        {
          backgroundColor: Colors.green,
        },
      ]}
      activeOpacity={0.6}
      onPress={handlePress}
    >
      <PlusIcon />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  plusButton: {
    width: sizes._56sdp,
    height: sizes._56sdp,
    borderRadius: sizes._990sdp,
    top: -sizes._16sdp,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
