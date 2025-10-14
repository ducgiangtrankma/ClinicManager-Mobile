import { _screen_height, _screen_width, sizes } from '@src/utils';
import React, { useCallback, useImperativeHandle, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  BottomSheetModalContainer,
  BottomSheetModalRef,
} from '../AppBottomSheet';
import { Box } from '../Box';
import { AppText } from '../AppText';
import { useAppTheme } from '@src/common';

interface Props {
  onConfirm: (value: Date) => void;
  currentDate: Date;
}
export interface TimePickerRef {
  open(): void;
  close(): void;
}
const currentSnapPointsMax = (sizes._330sdp / _screen_height) * 100;
export const TimePicker = React.forwardRef<BottomSheetModalRef, Props>(
  (props, ref) => {
    const bottomSheetRef: React.RefObject<BottomSheetModalRef> =
      React.createRef<any>();
    const { Colors } = useAppTheme();
    const [initialDate, setInitialDate] = useState<Date>(props.currentDate);
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

    const onApplySelect = useCallback(() => {
      props.onConfirm(initialDate);
      bottomSheetRef.current?.close();
    }, [bottomSheetRef, initialDate, props]);
    return (
      <BottomSheetModalContainer
        currentSnapPoints={['1%', `${currentSnapPointsMax}%`]}
        ref={bottomSheetRef}
        title="time_picker_title"
        // showConfirmButton={true}
      >
        <Box>
          <DatePicker
            style={styles.datePicker}
            locale="vi"
            date={initialDate}
            // onDateChange={mode ? setDate : setTime}
            onDateChange={value => {
              setInitialDate(value);
            }}
            mode={'datetime'}
            // androidVariant="iosClone"
            // minimumDate={new Date()}
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
  datePicker: { height: 300, width: _screen_width, alignSelf: 'center' },
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
