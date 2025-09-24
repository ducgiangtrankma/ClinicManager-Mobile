import { cosmeticsDummy, ProductEntity, ProductSelected } from '@src/models';
import { _screen_height, sizes } from '@src/utils';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  BottomSheetModalContainer,
  BottomSheetModalRef,
} from '../AppBottomSheet';
import { AppList } from '../AppList';
import { Box } from '../Box';
import { ProductItem } from './ProductItem';
import { AppText } from '../AppText';
import { useAppTheme } from '@src/common';

interface Props {
  onSelect: (value: ProductSelected[]) => void;
}
export interface SelectCosmeticsRef {
  open(): void;
  close(): void;
}
const currentSnapPointsMax = (sizes._480sdp / _screen_height) * 100;

export const SelectCosmetics = forwardRef<SelectCosmeticsRef, Props>(
  (props, ref) => {
    const { onSelect } = props;
    const { Colors } = useAppTheme();

    const bottomSheetRef: React.RefObject<BottomSheetModalRef> =
      React.createRef<any>();

    const [listSelected, setListSelected] = useState<ProductSelected[]>([]);
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

    const renderItem = useCallback(
      ({ item }: { item: ProductEntity }) => {
        return (
          <ProductItem
            item={item}
            edited
            listSelected={listSelected}
            onSelected={value => setListSelected(value)}
          />
        );
      },
      [listSelected],
    );

    const onApplySelect = useCallback(() => {
      onSelect(listSelected);
      bottomSheetRef.current?.close();
    }, [bottomSheetRef, listSelected, onSelect]);

    return (
      <BottomSheetModalContainer
        currentSnapPoints={['1%', `${currentSnapPointsMax}%`]}
        ref={bottomSheetRef}
        title="select_cosmetic_title"
      >
        <Box style={styles.container}>
          <AppList
            style={{ height: _screen_height * 0.5 }}
            data={cosmeticsDummy}
            renderItem={renderItem}
            canRefresh
            keyExtractor={(item: ProductEntity) => `${item?.id}`}
          />
          <Box
            direction="horizontal"
            justify="space-between"
            gap={sizes._8sdp}
            style={[styles.footer, { borderTopColor: Colors.divider }]}
          >
            <TouchableOpacity
              onPress={() => bottomSheetRef.current?.close()}
              style={[
                styles.baseButton,
                { backgroundColor: Colors.cancelButton },
              ]}
            >
              <AppText
                translationKey="datePicker.button.cancel"
                fontFamily="content_medium"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onApplySelect}
              style={[styles.baseButton, { backgroundColor: Colors.green }]}
            >
              <AppText
                translationKey="datePicker.button.apply"
                color={Colors.white}
                fontFamily="content_bold"
              />
            </TouchableOpacity>
          </Box>
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
  option: {
    padding: sizes._12sdp,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: sizes._8sdp,
    marginVertical: sizes._4sdp,
  },
  baseButton: {
    borderRadius: sizes._99sdp,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: sizes._16sdp,
  },
  footer: {
    borderTopWidth: sizes._1sdp,
    paddingTop: sizes._24sdp,
    paddingHorizontal: sizes._16sdp,
  },
});
