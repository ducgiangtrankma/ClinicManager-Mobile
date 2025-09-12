import React, { useImperativeHandle, useState } from 'react';
import { Modal, StatusBar, StyleSheet, View, Platform } from 'react-native';
import { AppActivityIndicator } from '../AppActivityIndicator';

export const globalLoadingRef = React.createRef<any>();

export const globalLoading = {
  show: () => {
    globalLoadingRef?.current?.show();
  },
  hide: () => {
    globalLoadingRef?.current?.hide();
  },
};

export interface Props {}

export const GlobalLoading = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  useImperativeHandle(ref, () => {
    return { show: show, hide: hide };
  });

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return (
    //Bọc view fix lỗi modal android
    <View>
      <Modal
        visible={visible}
        animationType={'none'}
        transparent
        statusBarTranslucent
        supportedOrientations={['portrait', 'landscape']}
      >
        <StatusBar
          translucent
          backgroundColor={'rgba(0,0,0,0.1)'}
          barStyle={'light-content'}
        />
        <View style={styles.main}>
          <View style={styles.loaderContainer}>
            <AppActivityIndicator animating={true} />
          </View>
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    }),
  },
  loaderContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
