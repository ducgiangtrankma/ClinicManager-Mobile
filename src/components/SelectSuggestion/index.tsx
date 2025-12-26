import { useAppTheme } from '@src/common';
import TranslationKeys from '@src/utils/translations/i18n-type';
import { _screen_height, sizes } from '@src/utils';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
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
import { AppButton } from '../AppButton';

const SheetScrollView =
  Platform.OS === 'android' ? GestureScrollView : NativeScrollView;

interface OpenParams {
  suggestions: string[];
  title?: TranslationKeys;
  onConfirm: (selectedItems: string[]) => void;
}

export interface SelectSuggestionRef {
  open(params: OpenParams): void;
  close(): void;
}

const currentSnapPointsMax = (sizes._480sdp / _screen_height) * 100;

export const SelectSuggestion = forwardRef<SelectSuggestionRef, {}>((_, ref) => {
  const { Colors } = useAppTheme();
  const bottomSheetRef: React.RefObject<BottomSheetModalRef> =
    React.createRef<any>();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [title, setTitle] = useState<TranslationKeys>('select_suggestion_title');
  const [onConfirmCallback, setOnConfirmCallback] = useState<
    ((items: string[]) => void) | null
  >(null);

  useImperativeHandle(
    ref,
    () => ({
      open: (params: OpenParams) => {
        setSelectedItems([]);
        setSuggestions(params.suggestions);
        setTitle(params.title || 'select_suggestion_title');
        setOnConfirmCallback(() => params.onConfirm);
        bottomSheetRef.current?.open();
      },
      close: () => {
        bottomSheetRef.current?.close();
      },
    }),
    [bottomSheetRef],
  );

  const handleToggleItem = useCallback((item: string) => {
    setSelectedItems(prev => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      }
      return [...prev, item];
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (onConfirmCallback) {
      onConfirmCallback(selectedItems);
    }
    bottomSheetRef.current?.close();
  }, [selectedItems, onConfirmCallback, bottomSheetRef]);

  return (
    <BottomSheetModalContainer
      currentSnapPoints={['1%', `${currentSnapPointsMax}%`]}
      ref={bottomSheetRef}
      title={title}
    >
      <Box style={styles.container}>
        <SheetScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {suggestions.map((item, index) => {
            const isSelected = selectedItems.includes(item);
            return (
              <TouchableOpacity
                onPress={() => handleToggleItem(item)}
                key={`${item}-${index}`}
                style={[
                  styles.item,
                  {
                    borderBottomColor: Colors.bottomSheetDivider,
                    backgroundColor: isSelected ? Colors.today : Colors.white,
                  },
                ]}
              >
                <Box direction="horizontal" align="center" gap={sizes._12sdp}>
                  <Box
                    style={[
                      styles.checkbox,
                      {
                        borderColor: isSelected ? Colors.green : Colors.content,
                        backgroundColor: isSelected
                          ? Colors.green
                          : Colors.white,
                      },
                    ]}
                  >
                    {isSelected && (
                      <AppText style={styles.checkmark}>✓</AppText>
                    )}
                  </Box>
                  <AppText style={styles.itemText}>{item}</AppText>
                </Box>
              </TouchableOpacity>
            );
          })}
        </SheetScrollView>
        <Box style={styles.buttonContainer}>
          <AppButton
            title="common_confirm"
            onPress={handleConfirm}
            disabled={selectedItems.length === 0}
            style={styles.confirmButton}
          />
        </Box>
      </Box>
    </BottomSheetModalContainer>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: sizes._8sdp,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: sizes._16sdp,
  },
  item: {
    paddingHorizontal: sizes._16sdp,
    paddingVertical: sizes._12sdp,
    borderBottomWidth: sizes._1sdp,
  },
  itemText: {
    flex: 1,
  },
  checkbox: {
    width: sizes._24sdp,
    height: sizes._24sdp,
    borderRadius: sizes._4sdp,
    borderWidth: sizes._2sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: sizes._14sdp,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: sizes._16sdp,
    paddingTop: sizes._12sdp,
    paddingBottom: sizes._8sdp,
  },
  confirmButton: {
    borderRadius: sizes._12sdp,
  },
});
