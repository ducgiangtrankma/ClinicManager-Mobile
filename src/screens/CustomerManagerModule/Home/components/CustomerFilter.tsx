import { CheckIcon, UnCheckIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import {
  AppButton,
  AppSelectForm,
  AppText,
  BottomSheetModalContainer,
  BottomSheetModalRef,
  Box,
  DateTimePicker,
  DateTimePickerReft,
  FormTitle,
} from '@src/components';
import { ACTIVE_OPACITY_TOUCH, sizes } from '@src/utils';
import dayjs from 'dayjs';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  ScrollView as NativeScrollView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ScrollView as GestureScrollView } from 'react-native-gesture-handler';
const SheetScrollView =
  Platform.OS === 'android' ? GestureScrollView : NativeScrollView;

export interface CustomerFilterValue {
  fromDate?: string;
  toDate?: string;
  hasDebt?: boolean;
}

interface Props {
  onFilterChange?: (filter: CustomerFilterValue) => void;
}

export interface CustomerFilterRef {
  open: (filter: any) => void;
  close(): void;
}

export const CustomerFilter = forwardRef<CustomerFilterRef, Props>(
  (props, ref) => {
    const { onFilterChange } = props;
    const { Colors } = useAppTheme();
    const bottomSheetRef: React.RefObject<BottomSheetModalRef> =
      React.createRef<any>();
    const startDatetimePickerRef = useRef<DateTimePickerReft>(null);
    const endDatetimePickerRef = useRef<DateTimePickerReft>(null);

    const [startDate, setStartDate] = useState<string | undefined>(undefined);
    const [endDate, setEndDate] = useState<string | undefined>(undefined);
    const [hasDebt, setHasDebt] = useState<boolean | undefined>(undefined);

    const handleApplyFilter = () => {
      onFilterChange?.({
        fromDate: startDate,
        toDate: endDate,
        hasDebt: hasDebt,
      });
      bottomSheetRef.current?.close();
    };

    const handleClearFilter = () => {
      setStartDate(undefined);
      setEndDate(undefined);
      setHasDebt(undefined);
      onFilterChange?.({
        fromDate: undefined,
        toDate: undefined,
        hasDebt: undefined,
      });
    };

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
      <>
        <BottomSheetModalContainer
          ref={bottomSheetRef}
          title="customer_filter_title"
          currentSnapPoints={['1%', '40%']}
        >
          <Box style={styles.container}>
            <SheetScrollView>
              <Box gap={sizes._16sdp}>
                <TouchableOpacity
                  activeOpacity={ACTIVE_OPACITY_TOUCH}
                  onPress={() => {
                    if (hasDebt) {
                      setHasDebt(undefined);
                    } else {
                      setHasDebt(true);
                    }
                  }}
                >
                  <Box horizontal align="center" gap={sizes._12sdp}>
                    {hasDebt ? (
                      <CheckIcon color={Colors.green} />
                    ) : (
                      <UnCheckIcon />
                    )}
                    <AppText fontFamily="content_bold">
                      Khách hàng còn công nợ
                    </AppText>
                  </Box>
                </TouchableOpacity>
                <FormTitle title="customer_filter" />
                <Box horizontal gap={sizes._16sdp}>
                  <Box style={styles.full}>
                    <AppSelectForm
                      onPress={() => startDatetimePickerRef.current?.open()}
                      placeholder="customer_filter_select_date"
                      errMessage={''}
                      value={
                        startDate
                          ? {
                              id: startDate,
                              value: startDate,
                              label: dayjs(startDate).format('DD/MM/YYYY'),
                            }
                          : undefined
                      }
                    />
                  </Box>
                  <Box style={styles.full}>
                    <AppSelectForm
                      onPress={() => endDatetimePickerRef.current?.open()}
                      placeholder="customer_filter_select_date"
                      errMessage={''}
                      value={
                        endDate
                          ? {
                              id: endDate,
                              value: endDate,
                              label: dayjs(endDate).format('DD/MM/YYYY'),
                            }
                          : undefined
                      }
                    />
                  </Box>
                </Box>
              </Box>
            </SheetScrollView>

            <Box
              horizontal
              gap={sizes._16sdp}
              style={[
                styles.actionContainer,
                {
                  backgroundColor: Colors.defaultPageBackground,
                  borderTopColor: Colors.divider,
                },
              ]}
            >
              <AppButton
                title="customer_filter_delete"
                onPress={handleClearFilter}
                style={[
                  styles.actionButton,
                  { backgroundColor: Colors.disableButtonBackground },
                ]}
                titleColor={Colors.black}
              />
              <AppButton
                title="customer_filter_apply"
                onPress={handleApplyFilter}
                style={styles.actionButton}
              />
            </Box>
          </Box>
        </BottomSheetModalContainer>

        <DateTimePicker
          ref={startDatetimePickerRef}
          value={startDate || dayjs().format('YYYY-MM-DD')}
          onChange={date => setStartDate(date)}
        />
        <DateTimePicker
          ref={endDatetimePickerRef}
          value={endDate || dayjs().format('YYYY-MM-DD')}
          onChange={date => setEndDate(date)}
        />
      </>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: sizes._16sdp,
    gap: sizes._16sdp,
    paddingHorizontal: sizes._16sdp,
  },
  buttonMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: sizes._6sdp,
  },
  titleMenu: {
    marginLeft: sizes._8sdp,
  },
  full: {
    flex: 1,
  },
  actionContainer: {
    padding: sizes._16sdp,
    borderTopWidth: sizes._1sdp,
  },
  actionButton: {
    flex: 1,
    borderRadius: sizes._12sdp,
  },
});
