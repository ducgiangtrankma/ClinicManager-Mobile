import { _screen_height, sizes } from '@src/utils';
import React, { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomSheetModalContainer,
  BottomSheetModalRef,
} from '../AppBottomSheet';
import { AppText } from '../AppText';
import { Box } from '../Box';
import { MaternitySelectEntity } from '@src/models';
interface Props {
  onSelect?: (value: MaternitySelectEntity) => void;
}
export interface SelectMaternityRef {
  open(): void;
  close(): void;
}
const currentSnapPointsMax = (sizes._480sdp / _screen_height) * 100;

export const SelectMaternity = forwardRef<SelectMaternityRef, Props>(
  (props, ref) => {
    const bottomSheetRef: React.RefObject<BottomSheetModalRef> =
      React.createRef<any>();

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
    return (
      <BottomSheetModalContainer
        currentSnapPoints={['1%', `${currentSnapPointsMax}%`]}
        ref={bottomSheetRef}
        title="select_maternity_title"
      >
        <Box style={styles.container}>
          <AppText>Chọn tình trạng thai sản:</AppText>
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
});
