import { useAppTheme } from '@src/common';
import { AppRemoteImage, FullScreenImageViewer } from '@src/components';
import { AttachmentEntity } from '@src/models';
import { _screen_width, sizes } from '@src/utils';
import React, { FC, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  images: AttachmentEntity[];
  itemWidth?: number;
  itemHeight?: number;
}

export const ImageSwipe: FC<Props> = ({ images, itemWidth, itemHeight }) => {
  const { Colors } = useAppTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullScreenVisible, setFullScreenVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  if (!images || images.length === 0) {
    return null;
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: AttachmentEntity;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={[
          styles.slideItem,
          {
            width: itemWidth ? itemWidth : _screen_width - sizes._32sdp,
            height: itemHeight
              ? itemHeight
              : (_screen_width - sizes._32sdp) * 0.75, // Tỉ lệ 4:3,
          },
        ]}
        activeOpacity={0.9}
        onPress={() => {
          setFullScreenVisible(true);
          setActiveIndex(index);
        }}
      >
        <AppRemoteImage
          uri={item.originalUrl}
          thumbnailUri={item.thumbnailUrl}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;

    const index = Math.round(offset / slideSize);

    if (index >= 0 && index < images.length) {
      setActiveIndex(index);
    } else if (index >= images.length) {
      setActiveIndex(images.length - 1);
    }
  };

  // Render chỉ số (dots) cho các hình ảnh
  const renderPagination = () => {
    if (images.length <= 1) {
      return null;
    }
    return (
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => {
              setActiveIndex(index);
              flatListRef.current?.scrollToIndex({
                index,
                animated: true,
              });
            }}
          >
            <View
              style={[
                styles.paginationDot,
                {
                  backgroundColor:
                    index === activeIndex
                      ? Colors.green
                      : Colors.grayBackground,
                  width: index === activeIndex ? sizes._24sdp : sizes._8sdp,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        keyExtractor={item => item.id}
        scrollEventThrottle={16}
      />
      {renderPagination()}

      <FullScreenImageViewer
        images={images}
        visible={fullScreenVisible}
        initialIndex={activeIndex}
        onClose={() => setFullScreenVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: sizes._8sdp,
    overflow: 'hidden',
  },
  slideItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: sizes._8sdp,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: sizes._16sdp,
    left: 0,
    right: 0,
    gap: sizes._4sdp,
  },
  paginationDot: {
    height: sizes._8sdp,
    borderRadius: sizes._4sdp,
  },
});
