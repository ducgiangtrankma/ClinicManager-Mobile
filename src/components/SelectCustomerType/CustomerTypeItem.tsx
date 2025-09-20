import { CheckIcon, UnCheckIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import { CUSTOMER_TYPE } from '@src/models';
import { sizes } from '@src/utils';
import React, { FC } from 'react';
import { AppText } from '../AppText';
import { Box } from '../Box';
export interface CustomerTypeSelectEntity {
  id: string;
  label: string;
  value: CUSTOMER_TYPE;
}
interface Props {
  item: CustomerTypeSelectEntity;
  selected: CustomerTypeSelectEntity;
}
export const CustomerTypeItem: FC<Props> = ({ item, selected }) => {
  const { Colors } = useAppTheme();
  const isSelect = item.value === selected.value;
  return (
    <Box
      horizontal
      align="center"
      gap={sizes._6sdp}
      style={{
        paddingHorizontal: sizes._16sdp,
        backgroundColor: isSelect
          ? Colors.grayBackground
          : Colors.defaultPageBackground,
        height: sizes._48sdp,
      }}
    >
      {item.value === selected.value ? (
        <CheckIcon color={Colors.green} />
      ) : (
        <UnCheckIcon />
      )}
      <AppText>{item.label}</AppText>
    </Box>
  );
};
