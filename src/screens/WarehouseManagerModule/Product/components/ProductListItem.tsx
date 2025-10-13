import { useAppTheme } from '@src/common';
import { AppText } from '@src/components';
import { ProductEntity } from '@src/models';
import { APP_SCREEN, navigate } from '@src/navigator';
import { sizes } from '@src/utils';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  item: ProductEntity;
}
export const ProductListItem: FC<Props> = ({ item }) => {
  const { Colors } = useAppTheme();

  return (
    <TouchableOpacity
      onPress={() =>
        navigate(APP_SCREEN.PRODUCT_DETAIL, {
          productId: item.id,
        })
      }
      style={[
        styles.productItem,
        {
          backgroundColor: Colors.white,
        },
      ]}
    >
      <AppText fontFamily="content_bold">{item.name}</AppText>
      <AppText>Tồn kho: {item.inventory}</AppText>
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
  },
});
