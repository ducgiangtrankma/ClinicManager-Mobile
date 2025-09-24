import { DecreaseIcon, IncreaseIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import { AppText } from '@src/components';
import { ProductSelected } from '@src/models';

import { CHANGE_COUNT_TYPE, sizes } from '@src/utils';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  item: ProductSelected;
  edited: boolean;

  onChange: (value: { id: string; quantity: number }) => void;
}
export const CosmeticItem: FC<Props> = ({ item, edited, onChange }) => {
  const { Colors } = useAppTheme();
  const [count, setCount] = useState<number>(item.quantity);

  useEffect(() => {
    setCount(item.quantity);
  }, [item]);

  const onChangeCount = useCallback(
    (product: ProductSelected, type: CHANGE_COUNT_TYPE) => {
      if (type === CHANGE_COUNT_TYPE.DECREASE) {
        const newCount = count - 1;
        if (newCount < 1) {
          return;
        }
        setCount(newCount);
        onChange({
          id: product.id,
          quantity: newCount,
        });

        return;
      }
      if (type === CHANGE_COUNT_TYPE.INCREASE) {
        const newCount = count + 1;
        setCount(newCount);
        onChange({
          id: product.id,
          quantity: newCount,
        });
      }
    },
    [count, onChange],
  );
  return (
    <View
      style={[
        styles.productItem,
        {
          borderBottomColor: Colors.divider,
        },
      ]}
    >
      <AppText>{item.name}</AppText>
      <>
        {edited ? (
          <View style={styles.countContainer}>
            <View style={styles.changeCount}>
              <TouchableOpacity
                style={[styles.decreaseBtn]}
                onPress={() => onChangeCount(item, CHANGE_COUNT_TYPE.DECREASE)}
              >
                <DecreaseIcon color={Colors.black} />
              </TouchableOpacity>
              <AppText>{count}</AppText>
              <TouchableOpacity
                onPress={() => onChangeCount(item, CHANGE_COUNT_TYPE.INCREASE)}
                style={styles.increaseBtn}
              >
                <IncreaseIcon color={Colors.black} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <AppText>{count}</AppText>
        )}
      </>
    </View>
  );
};
const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: sizes._46sdp,
    borderBottomWidth: sizes._1sdp,
    paddingHorizontal: sizes._8sdp,
    borderRadius: sizes._4sdp,
    marginBottom: sizes._4sdp,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  decreaseBtn: {
    height: sizes._34sdp,
    width: sizes._31sdp,
    borderTopLeftRadius: sizes._6sdp,
    borderBottomLeftRadius: sizes._6sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  increaseBtn: {
    height: sizes._34sdp,
    width: sizes._31sdp,
    borderTopRightRadius: sizes._6sdp,
    borderBottomRightRadius: sizes._6sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeCount: {
    height: sizes._34sdp,
    width: sizes._96sdp,
    flexDirection: 'row',
    borderRadius: sizes._6sdp,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
});
