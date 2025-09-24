import { DecreaseIcon, IncreaseIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import { ProductEntity, ProductSelected } from '@src/models';
import { CHANGE_COUNT_TYPE, DEFAULT_HIT_SLOP, sizes } from '@src/utils';
import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '../AppText';
import { Box } from '../Box';

interface Props {
  item: ProductEntity;
  listSelected: ProductSelected[];
  onSelected: (value: ProductSelected[]) => void;
  edited: boolean;
}
export const ProductItem: FC<Props> = ({
  item,
  listSelected,
  onSelected,
  edited,
}) => {
  const { Colors } = useAppTheme();
  const defaultCount = listSelected.find(e => e.id === item.id)?.quantity;
  const [count, setCount] = useState<number>(defaultCount ?? 1);
  const isSelected = useCallback(
    (product: ProductEntity) => {
      const isCheck = listSelected.find(e => e.id === product.id);
      return isCheck ? true : false;
    },
    [listSelected],
  );
  const handleSelected = useCallback(
    (product: ProductEntity) => {
      const isCheck = listSelected.find(e => e.id === product.id);
      if (isCheck) {
        const newList = listSelected.filter(e => e.id !== product.id);
        onSelected(newList);
        return;
      } else {
        onSelected([
          ...listSelected,
          {
            ...product,
            quantity: 1,
          },
        ]);
      }
    },
    [listSelected, onSelected],
  );
  const updateQuantity = useCallback(
    (id: string, newQuantity: number) => {
      return listSelected.map(e => {
        if (e.id === id) {
          return { ...e, quantity: newQuantity };
        }
        return e;
      });
    },
    [listSelected],
  );
  const onChangeCount = useCallback(
    (product: ProductEntity, type: CHANGE_COUNT_TYPE) => {
      if (type === CHANGE_COUNT_TYPE.DECREASE) {
        const newCount = count - 1;
        if (newCount < 1) {
          const newList = listSelected.filter(e => e.id !== product.id);
          onSelected(newList);
          return;
        }
        setCount(newCount);
        const newList = updateQuantity(product.id, newCount);
        onSelected(newList);
        return;
      }
      if (type === CHANGE_COUNT_TYPE.INCREASE) {
        const newCount = count + 1;
        setCount(newCount);
        const newList = updateQuantity(product.id, newCount);
        onSelected(newList);
      }
    },
    [count, onSelected, updateQuantity, listSelected],
  );
  return (
    <TouchableOpacity
      onPress={() => handleSelected(item)}
      style={[
        styles.productItem,
        {
          backgroundColor: Colors.white,
        },
        isSelected(item) && {
          backgroundColor: Colors.grayBackground,
        },
      ]}
    >
      <AppText>{item.name}</AppText>
      {isSelected(item) && (
        <>
          {edited ? (
            <Box horizontal align="flex-end" justify="space-between">
              <Box
                horizontal
                align="center"
                justify="space-between"
                style={[
                  styles.changeCount,
                  {
                    borderColor: Colors.white,
                  },
                ]}
              >
                <TouchableOpacity
                  hitSlop={DEFAULT_HIT_SLOP}
                  style={styles.decreaseBtn}
                  onPress={() =>
                    onChangeCount(item, CHANGE_COUNT_TYPE.DECREASE)
                  }
                >
                  <DecreaseIcon color={Colors.black} />
                </TouchableOpacity>
                <AppText fontFamily="content_semibold" fontSize="18">
                  {count}
                </AppText>
                <TouchableOpacity
                  hitSlop={DEFAULT_HIT_SLOP}
                  onPress={() =>
                    onChangeCount(item, CHANGE_COUNT_TYPE.INCREASE)
                  }
                  style={styles.increaseBtn}
                >
                  <IncreaseIcon color={Colors.black} />
                </TouchableOpacity>
              </Box>
            </Box>
          ) : (
            <AppText fontFamily="content_bold">{count}</AppText>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  decreaseBtn: {
    borderTopLeftRadius: sizes._6sdp,
    borderBottomLeftRadius: sizes._6sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  increaseBtn: {
    borderTopRightRadius: sizes._6sdp,
    borderBottomRightRadius: sizes._6sdp,
    // backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeCount: {
    gap: sizes._12sdp,
    borderRadius: sizes._6sdp,
    borderWidth: sizes._1sdp,
    paddingVertical: sizes._8sdp,
    paddingHorizontal: sizes._16sdp,
  },
});
