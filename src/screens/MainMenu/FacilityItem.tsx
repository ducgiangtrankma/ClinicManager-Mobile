import { CheckIcon, UnCheckIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import { AppText, Box } from '@src/components';
import { FacilityEntity } from '@src/models';
import { sizes } from '@src/utils';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  item: FacilityEntity;
  isSelect: boolean;
  onSelect: () => void;
}
export const FacilityItem: FC<Props> = ({ item, isSelect, onSelect }) => {
  const { Colors } = useAppTheme();
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        styles.item,
        {
          borderColor: Colors.green,
        },
      ]}
    >
      {isSelect ? <CheckIcon color={Colors.green} /> : <UnCheckIcon />}
      <Box>
        <AppText fontFamily="content_semibold">{item.name}</AppText>
        <AppText fontSize="12" color={Colors.blackGray}>
          {item.address}
        </AppText>
      </Box>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes._16sdp,
    width: '100%',
    paddingVertical: sizes._12sdp,
    paddingHorizontal: sizes._8sdp,
    borderRadius: sizes._12sdp,
    borderWidth: sizes._1sdp,
  },
});
