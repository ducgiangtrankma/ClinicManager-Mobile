import { TreatmentEntity } from '@src/models';
import { _screen_height, sizes } from '@src/utils';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView as NativeScrollView,
} from 'react-native';
import {
  BottomSheetModalContainer,
  BottomSheetModalRef,
} from '../AppBottomSheet';
import { Box } from '../Box';
import { CostItem } from './CostItem';
import { ScrollView as GestureScrollView } from 'react-native-gesture-handler';
interface Props {}
export interface CustomerCostRef {
  open: (data: TreatmentEntity[]) => void;
  close(): void;
}
const SheetScrollView =
  Platform.OS === 'android' ? GestureScrollView : NativeScrollView;
export const CustomerCost = forwardRef<CustomerCostRef, Props>((props, ref) => {
  const bottomSheetRef: React.RefObject<BottomSheetModalRef> =
    React.createRef<any>();
  const [treatments, stepTreatments] = useState<TreatmentEntity[]>([]);

  useImperativeHandle(
    ref,
    () => ({
      open: data => {
        stepTreatments(data);
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
      title="customer_detail_cost"
    >
      <Box style={styles.container}>
        <SheetScrollView>
          {treatments.map(item => (
            <CostItem key={item.id} treatment={item} />
          ))}
        </SheetScrollView>
      </Box>
    </BottomSheetModalContainer>
  );
});
const styles = StyleSheet.create({
  container: {
    paddingVertical: sizes._16sdp,
    gap: sizes._16sdp,
    height: _screen_height * 0.6,
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
