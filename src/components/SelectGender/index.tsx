import { useAppTheme } from '@src/common';
import {
  _screen_height,
  GENDER_DATA,
  OptionItem,
  renderGender,
  sizes,
} from '@src/utils';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  ScrollView as NativeScrollView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ScrollView as GestureScrollView } from 'react-native-gesture-handler';
import {
  BottomSheetModalContainer,
  BottomSheetModalRef,
} from '../AppBottomSheet';
import { AppText } from '../AppText';
import { Box } from '../Box';
import { Gender } from '@src/models';
const SheetScrollView =
  Platform.OS === 'android' ? GestureScrollView : NativeScrollView;
interface Props {
  onSelect?: (value: OptionItem) => void;
  valueSelect: string;
}
export interface SelectGenderRef {
  open(): void;
  close(): void;
}
const currentSnapPointsMax = (sizes._480sdp / _screen_height) * 100;

export const SelectGender = forwardRef<SelectGenderRef, Props>((props, ref) => {
  const { onSelect, valueSelect } = props;
  const { Colors } = useAppTheme();
  const bottomSheetRef: React.RefObject<BottomSheetModalRef> =
    React.createRef<any>();
  const genderValue = GENDER_DATA.find(e => e.value === valueSelect);

  const [value, setValue] = useState<OptionItem | undefined>(genderValue);
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
      title="select_gender_title"
    >
      <Box style={styles.container}>
        <SheetScrollView>
          {GENDER_DATA.map(item => (
            <TouchableOpacity
              onPress={() => {
                onSelect && onSelect(item);
                setValue(item);
              }}
              key={item.id}
              style={[
                styles.item,
                {
                  borderBottomColor: Colors.bottomSheetDivider,
                  backgroundColor:
                    item.value === value?.value
                      ? Colors.grayBackground
                      : Colors.white,
                },
              ]}
            >
              <AppText>{renderGender(item.label as Gender)}</AppText>
            </TouchableOpacity>
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
  item: {
    paddingHorizontal: sizes._16sdp,
    paddingVertical: sizes._12sdp,
    borderBottomWidth: sizes._1sdp,
  },
});
