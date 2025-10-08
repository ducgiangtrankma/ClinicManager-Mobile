import { useAppTheme } from '@src/common';
import { CUSTOMER_TYPE } from '@src/models';
import { OptionItem, sizes } from '@src/utils';
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
  selected: OptionItem;
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
        borderBottomColor: Colors.bottomSheetDivider,
        borderBottomWidth: sizes._1sdp,
      }}
    >
      <AppText>{item.label}</AppText>
    </Box>
  );
};
