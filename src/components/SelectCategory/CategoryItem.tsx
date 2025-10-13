import { useAppTheme } from '@src/common';
import { AppText } from '@src/components';
import { CategoryEntity } from '@src/models';
import { sizes } from '@src/utils';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  item: CategoryEntity;
  onSelect: (value: CategoryEntity) => void;
  valueSelect?: CategoryEntity;
}
export const CategoryListItem: FC<Props> = ({
  item,
  onSelect,
  valueSelect,
}) => {
  const { Colors } = useAppTheme();

  return (
    <TouchableOpacity
      onPress={() => onSelect(item)}
      style={[
        styles.productItem,
        {
          backgroundColor:
            valueSelect?.id === item.id ? Colors.grayBackground : Colors.white,
        },
      ]}
    >
      <AppText fontFamily="content_bold">{item.name}</AppText>
      <AppText>Sản phẩm: {item.productCount}</AppText>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  productItem: {
    paddingVertical: sizes._12sdp,
    paddingHorizontal: sizes._8sdp,
    borderRadius: sizes._4sdp,
    marginBottom: sizes._4sdp,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: sizes._2sdp },
    shadowOpacity: 0.08,
    shadowRadius: sizes._2sdp,
    // Android shadow
    elevation: sizes._6sdp,
    // khoảng cách giữa các item
    marginVertical: sizes._6sdp,
    gap: sizes._4sdp,
  },
});
