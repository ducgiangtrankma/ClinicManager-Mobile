import { CloseIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import { AttachmentEntity, GridImageEntity } from '@src/models';
import { _screen_height, _screen_width, sizes } from '@src/utils';
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import { AppText } from '../AppText';
import { ZoomableImage } from '../ZoomImage';

interface Props {
  images: (AttachmentEntity | GridImageEntity)[];
  visible: boolean;
  initialIndex: number;
  onClose: () => void;
}
export const FullScreenImageViewer: FC<Props> = ({
  images,
  visible,
  initialIndex = 0,
  onClose,
}) => {
  const { Colors } = useAppTheme();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const flatListRef = useRef<FlatList>(null);
  const [statusBarHidden, setStatusBarHidden] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [videoFullscreen, setVideoFullscreen] = useState(false);
  const videoRefs = useRef<{ [key: string]: any }>({});

  // Safe cleanup function cho videos
  const cleanupVideos = () => {
    setTimeout(() => {
      const refs = { ...videoRefs.current };
      Object.entries(refs).forEach(([id, videoRef]) => {
        try {
          if (videoRef && typeof videoRef.pause === 'function') {
            videoRef.pause();
          }
        } catch (error) {
          console.log(`Error cleaning up video ${id}:`, error);
        }
      });
      videoRefs.current = {};
    }, 100);
  };

  // Safe close function
  const handleClose = () => {
    cleanupVideos();
    onClose();
  };

  // Ẩn/hiện thanh trạng thái khi modal hiển thị/ẩn
  useEffect(() => {
    if (visible) {
      setStatusBarHidden(true);
    } else {
      setStatusBarHidden(false);
      // Dừng tất cả video khi đóng modal
      cleanupVideos();
    }

    return () => {
      setStatusBarHidden(false);
    };
  }, [visible]);

  // Cuộn đến ảnh được chọn khi modal mở
  useEffect(() => {
    if (visible && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: initialIndex,
          animated: false,
        });
        setCurrentIndex(initialIndex);
      }, 200);
    }
  }, [visible, initialIndex]);

  // Ẩn/hiện controls
  const [controlsVisible, setControlsVisible] = useState(true);
  const toggleControls = () => {
    if (controlsVisible) {
      // Ẩn controls
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Hiện controls
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setControlsVisible(!controlsVisible);
  };

  // Xử lý khi scroll để cập nhật index hiện tại và dừng video cũ
  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    if (index >= 0 && index < images.length) {
      // Dừng tất cả video trước khi chuyển với error handling
      Object.values(videoRefs.current).forEach((videoRef: any) => {
        try {
          if (
            videoRef &&
            videoRef.pause &&
            typeof videoRef.pause === 'function'
          ) {
            videoRef.pause();
          }
        } catch (error) {
          console.log('Error pausing video on scroll:', error);
        }
      });

      setCurrentIndex(index);
    }
  };

  // Render từng ảnh/video toàn màn hình
  const renderItem = ({
    item,
    index,
  }: {
    item: AttachmentEntity | GridImageEntity;
    index: number;
  }) => {
    if (item.type === 'video') {
      return (
        <View style={styles.videoFullScreenContainer}>
          <Video
            ref={ref => {
              if (ref) {
                videoRefs.current[item.id] = ref;
              } else {
                // Xóa ref khi component bị unmount
                delete videoRefs.current[item.id];
              }
            }}
            source={{ uri: item.originalUrl }}
            style={styles.fullVideoSafeArea}
            resizeMode="contain"
            paused={index !== currentIndex} // Chỉ play video hiện tại
            controls={true}
            poster={item.thumbnailUrl}
            posterResizeMode="contain"
            onFullscreenPlayerWillPresent={() => {
              setVideoFullscreen(true);
            }}
            onFullscreenPlayerWillDismiss={() => {
              setVideoFullscreen(false);
            }}
            onLoad={() => {
              console.log('Fullscreen video loaded');
            }}
            onError={error => {
              console.log('Fullscreen video error:', error);
              // Xóa ref bị lỗi
              delete videoRefs.current[item.id];
            }}
          />
        </View>
      );
    }

    return (
      <ZoomableImage uri={item.originalUrl} onSingleTap={toggleControls} />
    );
  };

  // Render pagination dots
  const renderPagination = () => {
    if (images.length <= 1) {
      return null;
    }

    return (
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor:
                  index === currentIndex ? Colors.while : Colors.grayBackground,
                width: index === currentIndex ? sizes._24sdp : sizes._8sdp,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View>
      <Modal visible={visible} transparent={true} animationType="fade">
        <StatusBar hidden={statusBarHidden} barStyle={'light-content'} />
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.viewerContainer}>
            <FlatList
              ref={flatListRef}
              data={images}
              renderItem={renderItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              keyExtractor={item => item.id}
              initialScrollIndex={initialIndex}
              getItemLayout={(_, index) => ({
                length: _screen_width,
                offset: _screen_width * index,
                index,
              })}
            />
            {/* Header controls - ẩn khi video đang fullscreen native */}
            {!videoFullscreen && (
              <Animated.View
                style={[
                  styles.headerControls,
                  {
                    opacity: fadeAnim,
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleClose}
                  activeOpacity={0.7}
                >
                  <CloseIcon fill={Colors.while} />
                </TouchableOpacity>
                <View style={styles.imageCounter}>
                  <AppText
                    fontSize="16"
                    fontFamily="content_bold"
                    style={{ color: Colors.while }}
                  >
                    {currentIndex + 1}/{images.length}
                  </AppText>
                </View>
              </Animated.View>
            )}
            {/* Bottom controls - ẩn khi video đang fullscreen native hoặc đang xem video */}
            {!videoFullscreen && images[currentIndex]?.type !== 'video' && (
              <Animated.View
                style={[
                  styles.footerControls,
                  {
                    opacity: fadeAnim,
                  },
                ]}
              >
                {renderPagination()}
              </Animated.View>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  viewerContainer: {
    flex: 1,
    position: 'relative',
  },
  slideFullScreen: {
    width: _screen_width,
    height: _screen_height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  headerControls: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: sizes._16sdp,
    zIndex: 10,
  },
  footerControls: {
    position: 'absolute',
    bottom: sizes._32sdp,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  closeButton: {
    width: sizes._40sdp,
    height: sizes._40sdp,
    borderRadius: sizes._20sdp,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCounter: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: sizes._12sdp,
    paddingVertical: sizes._6sdp,
    borderRadius: sizes._16sdp,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizes._4sdp,
  },
  paginationDot: {
    height: sizes._8sdp,
    borderRadius: sizes._4sdp,
  },
  fullVideo: {
    width: _screen_width,
    height: _screen_height,
  },
  fullVideoSafeArea: {
    width: _screen_width,
    height: _screen_height - sizes._120sdp, // Tăng space cho controls
    alignSelf: 'center',
  },
  videoFullScreenContainer: {
    width: _screen_width,
    height: _screen_height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: sizes._80sdp, // Tăng padding để video controls không bị che
  },
});
