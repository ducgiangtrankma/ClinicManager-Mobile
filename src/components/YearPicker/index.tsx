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
import {
  BottomSheetModalContainer,
  BottomSheetModalRef,
} from '../AppBottomSheet';
import { AppText } from '../AppText';
import { Box } from '../Box';

interface Props {
  value: string;
  onChange: (date: string) => void;
}
export interface YearPickerReft {
  open: () => void;
  close: () => void;
}

export const YearPicker = forwardRef<YearPickerReft, Props>((props, ref) => {
  const { value, onChange } = props;
  const { Colors } = useAppTheme();
  const [initialYear, setInitialYear] = useState<string>(value);
  const bottomSheetRef: React.RefObject<BottomSheetModalRef> =
    React.createRef<any>();

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        setInitialYear(value || dayjs().format('YYYY'));
        bottomSheetRef.current?.open();
      },
      close: () => {
        bottomSheetRef.current?.close();
      },
    }),
    [bottomSheetRef, value],
  );

  const years = Array.from(
    { length: 2050 - 2025 + 1 },
    (_, i) => `${2025 + i}`,
  );

  const onApplySelect = useCallback(() => {
    onChange(initialYear);
    bottomSheetRef.current?.close();
  }, [bottomSheetRef, initialYear, onChange]);

  return (
    <BottomSheetModalContainer
      index={-1}
      currentSnapPoints={['1%', '60%']}
      ref={bottomSheetRef}
      disableHeader
      title="year_picker_title"
    >
      <Box style={styles.contentContainer}>
        {/* Render grid năm */}
        <Box style={styles.gridContainer}>
          {years.map(year => {
            const isSelected = initialYear === year;
            return (
              <TouchableOpacity
                key={year}
                style={[
                  styles.yearItem,
                  {
                    backgroundColor: isSelected
                      ? Colors.green
                      : Colors.grayBackground,
                  },
                ]}
                onPress={() => setInitialYear(year)}
              >
                <AppText
                  color={isSelected ? Colors.white : Colors.defaultTextColor}
                  fontFamily={isSelected ? 'content_bold' : 'content_medium'}
                >
                  {year}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </Box>

        {/* Footer */}
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
            <AppText translationKey="cancel" fontFamily="content_medium" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onApplySelect}
            style={[styles.baseButton, { backgroundColor: Colors.green }]}
          >
            <AppText
              translationKey="apply"
              color={Colors.white}
              fontFamily="content_bold"
            />
          </TouchableOpacity>
        </Box>
      </Box>
    </BottomSheetModalContainer>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: sizes._16sdp,
    paddingTop: sizes._16sdp,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  yearItem: {
    width: '18%', // 5 cột + khoảng cách
    aspectRatio: 1.5, // hình chữ nhật ngang
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes._8sdp,
    marginBottom: sizes._8sdp,
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
});
