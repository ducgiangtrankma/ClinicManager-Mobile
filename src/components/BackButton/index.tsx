import {LeftArrowIcon} from '@src/assets';
import {goBack} from '@src/navigator';
import {ACTIVE_OPACITY_TOUCH, sizes} from '@src/utils';
import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';

interface Props {}
export const BackButton: FC<Props> = () => {
  return (
    <TouchableOpacity
      onPress={() => goBack()}
      activeOpacity={ACTIVE_OPACITY_TOUCH}
      hitSlop={{
        top: sizes._16sdp,
        right: sizes._16sdp,
        left: sizes._16sdp,
        bottom: sizes._16sdp,
      }}>
      <LeftArrowIcon />
    </TouchableOpacity>
  );
};
