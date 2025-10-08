import { CustomerEntity } from '@src/models';
import {
  _screen_height,
  ACTIVE_OPACITY_TOUCH,
  CUSTOMER_TYPE_DATA,
  OptionItem,
  sizes,
} from '@src/utils';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import {
  BottomSheetModalContainer,
  BottomSheetModalRef,
} from '../AppBottomSheet';
import { AppList } from '../AppList';
import { Box } from '../Box';

import { CustomerTypeItem, CustomerTypeSelectEntity } from './CustomerTypeItem';
interface Props {
  onSelect: (value: CustomerTypeSelectEntity) => void;
  valueSelect?: string;
}
export interface SelectCustomerTypeRef {
  open(): void;
  close(): void;
}
const currentSnapPointsMax = (sizes._480sdp / _screen_height) * 100;

export const SelectCustomerType = forwardRef<SelectCustomerTypeRef, Props>(
  (props, ref) => {
    const bottomSheetRef: React.RefObject<BottomSheetModalRef> =
      React.createRef<any>();
    const typeValue =
      CUSTOMER_TYPE_DATA.find(e => e.value === props.valueSelect) ??
      CUSTOMER_TYPE_DATA[0];

    const [selected, setSelected] = useState<OptionItem>(typeValue);

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          bottomSheetRef.current?.open();
        },
        close: () => {
          bottomSheetRef.current?.close();
        },
      }),
      [bottomSheetRef],
    );

    const handleSelectItem = useCallback(
      (item: CustomerTypeSelectEntity) => {
        setSelected(item);
        // Call the callback to update form
        props.onSelect?.(item);
        // Close the modal
        bottomSheetRef.current?.close();
      },
      [props, bottomSheetRef],
    );

    const renderItem = useCallback(
      ({ item, index }: { item: CustomerTypeSelectEntity; index: number }) => {
        return (
          <Animated.View
            entering={FadeInRight.springify()
              .damping(80)
              .stiffness(500)
              .delay(index * 30)}
            exiting={FadeOutLeft.springify().damping(80).stiffness(500)}
          >
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY_TOUCH}
              onPress={() => handleSelectItem(item)}
            >
              <CustomerTypeItem item={item} selected={selected} />
            </TouchableOpacity>
          </Animated.View>
        );
      },
      [selected, handleSelectItem],
    );

    return (
      <BottomSheetModalContainer
        currentSnapPoints={['1%', `${currentSnapPointsMax}%`]}
        ref={bottomSheetRef}
        title="select_customer_type_title"
      >
        <Box style={styles.container}>
          <AppList
            style={{ height: _screen_height * 0.4 }}
            data={CUSTOMER_TYPE_DATA}
            renderItem={renderItem}
            canRefresh
            keyExtractor={(item: CustomerEntity) => `${item?.id}`}
          />
        </Box>
      </BottomSheetModalContainer>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    paddingVertical: sizes._16sdp,
    gap: sizes._16sdp,
  },
  buttonMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: sizes._6sdp,
  },
  titleMenu: {
    marginLeft: sizes._8sdp,
  },
});
