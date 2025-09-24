import {
  AppText,
  BottomSheetModalContainer,
  BottomSheetModalRef,
  Box,
} from '@src/components';
import { _screen_height, sizes } from '@src/utils';
import React, { forwardRef, useImperativeHandle } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface Props {}
export interface CustomerFilterRef {
  open: (filter: any) => void;
  close(): void;
}

export const CustomerFilter = forwardRef<CustomerFilterRef, Props>(
  (props, ref) => {
    const bottomSheetRef: React.RefObject<BottomSheetModalRef> =
      React.createRef<any>();

    useImperativeHandle(
      ref,
      () => ({
        open: filter => {
          console.log('filter', filter);
          bottomSheetRef.current?.open();
        },
        close: () => {
          bottomSheetRef.current?.close();
        },
      }),
      [bottomSheetRef],
    );

    return (
      <BottomSheetModalContainer
        ref={bottomSheetRef}
        title="customer_filter_title"
      >
        <Box style={styles.container}>
          <ScrollView>
            <AppText>Filter</AppText>
          </ScrollView>
        </Box>
      </BottomSheetModalContainer>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    paddingVertical: sizes._16sdp,
    gap: sizes._16sdp,
    height: _screen_height * 0.5,
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
