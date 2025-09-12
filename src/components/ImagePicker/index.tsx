import { LocalFileEntity } from '@src/models';
import { MAX_COUNT_IMAGE_UPLOAD, _screen_height, sizes } from '@src/utils';
import React, { useCallback, useImperativeHandle } from 'react';
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import {
  BottomSheetModalContainer,
  BottomSheetModalRef,
} from '../AppBottomSheet';
// import {showErrorMessage} from '../AppAlert';
import { CameraIcon, GalleryIcon } from '@src/assets';
import { showErrorMessage } from '../AppAlert';
import { AppText } from '../AppText';

export const MAX_IMAGE_DIMENSION = {
  WIDTH: 1080,
  HEIGHT: 1920,
};
const MAX_SIZE_IN_MB = 10;

interface Props {
  onConfirm: (image: LocalFileEntity[]) => void;
  isMultiple?: boolean;
  max_amount?: number;
}
export interface AttachmentPickerRef {
  open(): void;
  close(): void;
}
const currentSnapPointsMax = (sizes._280sdp / _screen_height) * 100;
export const AttachmentPicker = React.forwardRef<BottomSheetModalRef, Props>(
  (props, ref) => {
    const { onConfirm, isMultiple, max_amount } = props;
    const MAX_AMOUNT =
      max_amount !== undefined ? max_amount : MAX_COUNT_IMAGE_UPLOAD;

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

    const checkCameraPermission = useCallback(async () => {
      try {
        const result = await check(
          Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.CAMERA
            : PERMISSIONS.IOS.CAMERA,
        );
        return result;
      } catch (err) {
        return false;
      }
    }, []);

    const openCameraSetting = useCallback(() => {
      if (Platform.OS === 'android') {
        Linking.openSettings();
      } else {
        Linking.openURL('app-settings://');
      }
    }, []);

    const requestCameraPermission = useCallback(async () => {
      try {
        const result = await request(
          Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.CAMERA
            : PERMISSIONS.IOS.CAMERA,
        );
        if (result === RESULTS.BLOCKED) {
          Alert.alert(
            'Xin cấp quyền',
            'Vui lòng cấp quyền camera cho ứng dụng',
            [
              {
                text: 'Cancel',
                onPress: () => {
                  showErrorMessage(
                    'error.title',
                    'error.camera.permission',
                    2000,
                  );
                },
                style: 'cancel',
              },
              { text: 'OK', onPress: () => openCameraSetting() },
            ],
          );
        }
        return result === RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    }, [openCameraSetting]);

    const validationFile = useCallback(
      (list: any[]) => {
        // Filter file has exceed size limited
        const origin_num = list.length;
        list = list.filter(item => item.size / (1024 * 1024) <= MAX_SIZE_IN_MB);
        if (origin_num !== list.length) {
          showErrorMessage('error.title', 'error.file.maxSize', 2000);
        } else {
          if (isMultiple) {
            if (list.length > MAX_AMOUNT) {
              showErrorMessage('error.title', 'maxCount', 2000, undefined, {
                count: MAX_AMOUNT,
              });
              return;
            }
            onConfirm(list);
            return;
          }
          onConfirm(list[0]);
        }
      },
      [isMultiple, onConfirm, MAX_AMOUNT],
    );

    const openCamera = useCallback(async () => {
      const per = await checkCameraPermission();
      if (per === RESULTS.DENIED) {
        const res = await requestCameraPermission();
        if (res) {
          openCamera();
        }
      } else {
        launchCamera({
          mediaType: 'photo',
          includeBase64: false,
          cameraType: 'back',
          saveToPhotos: false,
          maxWidth: MAX_IMAGE_DIMENSION.WIDTH,
          maxHeight: MAX_IMAGE_DIMENSION.HEIGHT,
        })
          .then(res => {
            if (res.assets) {
              const list = res.assets.map(item => ({
                ...item,
                name: item.fileName,
                size: item.fileSize,
              }));
              //   onConfirm(list[0]);
              validationFile(list);
            }
          })

          .catch(() => {})
          .finally(() => {});
        bottomSheetRef.current?.close();
      }
    }, [
      bottomSheetRef,
      checkCameraPermission,
      requestCameraPermission,
      validationFile,
    ]);

    const openLibrary = useCallback(() => {
      launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit: isMultiple ? 0 : 1,
        maxWidth: MAX_IMAGE_DIMENSION.WIDTH,
        maxHeight: MAX_IMAGE_DIMENSION.HEIGHT,
      })
        .then(res => {
          if (res.assets) {
            const list = res.assets.map(item => ({
              ...item,
              name: item.fileName,
              size: item.fileSize,
            }));
            // onConfirm(list[0]);
            validationFile(list);
          }
        })
        .catch(() => {})
        .finally(() => {});
      bottomSheetRef.current?.close();
    }, [bottomSheetRef, validationFile, isMultiple]);

    return (
      <BottomSheetModalContainer
        currentSnapPoints={['1%', `${currentSnapPointsMax}%`]}
        ref={bottomSheetRef}
        title="imagePicker.title"
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonMenu}
            onPress={() => openCamera()}
          >
            <CameraIcon />
            <AppText
              fontSize="18"
              style={styles.titleMenu}
              fontFamily="content_regular"
            >
              Máy ảnh
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonMenu}
            onPress={() => openLibrary()}
          >
            <GalleryIcon />
            <AppText
              fontSize="18"
              style={styles.titleMenu}
              fontFamily="content_regular"
            >
              Thư viện ảnh
            </AppText>
          </TouchableOpacity>
        </View>
      </BottomSheetModalContainer>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sizes._12sdp,
    paddingVertical: sizes._6sdp,
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
