import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useAppTheme } from '@src/common';

import { CloseIcon } from '@src/assets';
import { sizes } from '@src/utils';
import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { AppText } from '../AppText';
import { Box } from '../Box';
import TranslationKeys from '@src/utils/translations/i18n-type';

interface Props {
  currentSnapPoints?: Array<string | number>; //Custom height bottom sheet
  children: React.ReactElement;
  title: TranslationKeys;
  index?: number;
  enablePanDownToClose?: boolean;
  enableBackDrop?: boolean;
  enableIndicator?: boolean;
  disableHeader?: boolean;
  enableContentPanningGesture?: boolean;
}

export interface BottomSheetModalRef {
  open(): void;
  close(): void;
}
const defaultSnapPoints = ['40%', '50%'];
const BottomSheetModalContainerCpn = React.forwardRef<
  BottomSheetModalRef,
  Props
>((props, ref) => {
  const { Colors } = useAppTheme();
  const {
    currentSnapPoints,
    children,
    title,
    enableBackDrop = true,
    enablePanDownToClose = true,
    enableIndicator = true,
    enableContentPanningGesture = true,
  } = props;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const reducedMotion = useReducedMotion();
  const snapPoints = useMemo(
    () => currentSnapPoints ?? defaultSnapPoints,
    [currentSnapPoints],
  );
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === 0 && props.enablePanDownToClose === true) {
        bottomSheetRef.current?.close();
      }
    },
    [props.enablePanDownToClose],
  );

  const onClose = () => {
    Keyboard.dismiss();
    bottomSheetRef?.current?.close();
  };
  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        bottomSheetRef.current?.expand();
      },
      close: () => {
        onClose();
      },
    }),
    [],
  );

  const renderBackdrop = useCallback(
    (backDropProps: any) =>
      enableBackDrop ? (
        <BottomSheetBackdrop
          {...backDropProps}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          onPress={onClose}
        />
      ) : null,
    [enableBackDrop],
  );
  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      index={props.index ?? -1}
      enablePanDownToClose={enablePanDownToClose} // Không cho vuốt xuống để đóng
      enableContentPanningGesture={enableContentPanningGesture} // Cho phép vuốt nội dung bên trong
      enableHandlePanningGesture={true} // Cho phép kéo handle
      animateOnMount={!reducedMotion}
      onChange={handleSheetChanges}
      handleIndicatorStyle={{
        backgroundColor: Colors.activityIndicatorColor,
        height: enableIndicator ? sizes._4sdp : sizes._0sdp,
      }}
      style={styles.sheetContainer}
      backgroundStyle={{
        backgroundColor: Colors.while, // Màu nền của bottom sheet
      }}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView
        style={[
          styles.contentContainer,
          {
            backgroundColor: Colors.while,
          },
        ]}
      >
        {!props.disableHeader && (
          <>
            <Box
              reverse="horizontal"
              justify="space-between"
              align="center"
              style={{ paddingHorizontal: sizes._16sdp }}
            >
              <TouchableOpacity onPress={onClose}>
                <CloseIcon />
              </TouchableOpacity>
              <AppText
                translationKey={title}
                fontFamily="content_bold"
                fontSize="18"
                style={styles.title}
              />
            </Box>
            <Box
              style={[
                styles.divider,
                {
                  backgroundColor: Colors.bottomSheetDivider,
                },
              ]}
            />
          </>
        )}

        {children}
      </BottomSheetView>
    </BottomSheet>
  );
});
const styles = StyleSheet.create({
  sheetContainer: {
    borderTopLeftRadius: sizes._24sdp,
    borderTopRightRadius: sizes._24sdp,
    overflow: 'hidden', // Ẩn nội dung bên ngoài đường viền
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: sizes._12sdp,
    marginBottom: sizes._12sdp,
  },
  divider: {
    width: '100%',
    height: sizes._1sdp,
  },
});
export const BottomSheetModalContainer = React.memo(
  BottomSheetModalContainerCpn,
);
/**
 * Issue: Auto close with index = -1 after change state in first open. Only in version 5.x.x
 * https://github.com/gorhom/react-native-bottom-sheet/issues/2068
 */
