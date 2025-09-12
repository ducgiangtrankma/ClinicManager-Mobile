import { CalendarArrowLeftIcon, CalendarArrowRightIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import { sizes } from '@src/utils';
import dayjs from 'dayjs';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import {
  BottomSheetModalContainer,
  BottomSheetModalRef,
} from '../AppBottomSheet';
import { AppText } from '../AppText';
import { Box } from '../Box';
import { APP_FONTS } from '@src/themes';

interface Props {
  value: string;
  onChange: (date: string) => void;
}
export interface DateTimePickerReft {
  open: () => void;
}
export const DateTimePicker = forwardRef<DateTimePickerReft, Props>(
  (props, ref) => {
    const { value, onChange } = props;
    const { Colors, IsDark } = useAppTheme();
    const [initialDate, setInitialDate] = useState<string>(value);
    const bottomSheetRef: React.RefObject<BottomSheetModalRef> =
      React.createRef<any>();
    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          setInitialDate(value || dayjs().format('YYYY-MM-DD'));

          bottomSheetRef.current?.open();
        },
        close: () => {
          bottomSheetRef.current?.close();
        },
      }),
      [bottomSheetRef, value],
    );

    const handleSelectDate = useCallback((date: DateData) => {
      setInitialDate(date.dateString);
    }, []);

    const onApplySelect = useCallback(() => {
      onChange(initialDate);
      bottomSheetRef.current?.close();
    }, [bottomSheetRef, initialDate, onChange]);
    return (
      <BottomSheetModalContainer
        index={-1}
        currentSnapPoints={['1%', '60%']}
        ref={bottomSheetRef}
        disableHeader
        title="datePicker.title"
      >
        <Box style={styles.contentContainer}>
          <Box
            style={styles.calendarHeader}
            direction="horizontal"
            justify="space-between"
          >
            <TouchableOpacity
              onPress={() =>
                setInitialDate(
                  dayjs(initialDate).subtract(1, 'month').format('YYYY-MM-DD'),
                )
              }
            >
              <CalendarArrowLeftIcon />
            </TouchableOpacity>
            <AppText fontFamily="content_bold" fontSize="18">
              {dayjs(initialDate).format('DD-MM-YYYY')}
            </AppText>
            <TouchableOpacity
              onPress={() =>
                setInitialDate(
                  dayjs(initialDate).add(1, 'month').format('YYYY-MM-DD'),
                )
              }
            >
              <CalendarArrowRightIcon />
            </TouchableOpacity>
          </Box>
          <Calendar
            firstDay={1}
            key={`calendar-${IsDark ? 'dark' : 'light'}`}
            initialDate={initialDate}
            onDayPress={handleSelectDate}
            renderHeader={() => null}
            markingType="custom"
            markedDates={{
              [initialDate]: {
                customStyles: {
                  container: {
                    backgroundColor: Colors.green,
                    borderRadius: 8,
                  },
                  text: {
                    color: 'white',
                    fontWeight: 'bold',
                  },
                },
              },
            }}
            hideArrows
            hideExtraDays
            theme={{
              calendarBackground: Colors.while,
              dayTextColor: Colors.defaultTextColor,
              textDayFontSize: sizes._14sdp,
              textDayFontWeight: '500',
              textDisabledColor: 'gray',
              textDayHeaderFontSize: sizes._14sdp,
              textDayHeaderFontWeight: '500',
              textSectionTitleColor: Colors.defaultTextColor,
              todayTextColor: Colors.green,
              textDayHeaderFontFamily: APP_FONTS.content_bold,
            }}
            style={{ backgroundColor: Colors.while }}
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
                color={Colors.while}
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: sizes._16sdp,
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
  },
  calendarHeader: {
    paddingVertical: sizes._16sdp,
  },
});

/**
 * using:
 * import ForwardRefComponent
 * Create ref: const componentRef = useRef<ComponentRef>(null);
 * Add component:  <ForwardRefComponent ref={componentRef} />
 * Call function: componentRef.current?.publicFunction()
 */
