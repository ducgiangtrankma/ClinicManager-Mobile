import { CloseIcon, VideoIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import {
  AppRemoteImage,
  AppText,
  Box,
  FullScreenImageViewer,
} from '@src/components';

import {
  AttachmentEntity,
  GridImageEntity,
  LocalFileEntity,
} from '@src/models';
import {
  _screen_width,
  ACTIVE_OPACITY_TOUCH,
  attachmentsToGridImages,
  localFilesToGridImages,
  sizes,
} from '@src/utils';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';
const WIDTH_CONTAINER = _screen_width - sizes._48sdp;
const SPACING = sizes._4sdp;

interface Props {
  localImages?: LocalFileEntity[];
  remoteImages?: AttachmentEntity[];
  onPressImage?: (index: number) => void;
  onDelete?: (image: GridImageEntity) => void;
}

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
  isWide: boolean;
  isTall: boolean;
  isSquare: boolean;
}

interface LayoutItem {
  index: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

// Helper function để phân tích kích thước ảnh
const analyzeImageDimensions = (_image: GridImageEntity): ImageDimensions => {
  const width = 400; // Default width
  const height = 400; // Default height
  const aspectRatio = width / height;

  return {
    width,
    height,
    aspectRatio,
    isWide: aspectRatio > 1.3,
    isTall: aspectRatio < 0.7,
    isSquare: aspectRatio >= 0.7 && aspectRatio <= 1.3,
  };
};

// Helper function tạo layout thông minh
const createSmartLayout = (
  images: GridImageEntity[],
  containerWidth: number,
  spacing: number,
): LayoutItem[][] => {
  const count = images.length;
  const imageDimensions = images.map(analyzeImageDimensions);

  if (count === 1) {
    const dims = imageDimensions[0];
    let height = containerWidth * 0.75; // Default height

    if (dims.isWide) {
      height = containerWidth * 0.6; // Shorter for wide images
    } else if (dims.isTall) {
      height = containerWidth * 0.9; // Taller for tall images
    }

    return [
      [
        {
          index: 0,
          width: containerWidth,
          height,
          x: 0,
          y: 0,
        },
      ],
    ];
  }

  if (count === 2) {
    const [img1, img2] = imageDimensions;

    // Nếu cả 2 ảnh đều tall, stack vertically
    if (img1.isTall && img2.isTall) {
      const height = containerWidth * 0.6;
      return [
        [
          { index: 0, width: containerWidth, height, x: 0, y: 0 },
          {
            index: 1,
            width: containerWidth,
            height,
            x: 0,
            y: height + spacing,
          },
        ],
      ];
    }

    // Default: side by side
    const itemWidth = (containerWidth - spacing) / 2;
    const height = img1.isWide || img2.isWide ? itemWidth * 0.7 : itemWidth;

    return [
      [
        { index: 0, width: itemWidth, height, x: 0, y: 0 },
        { index: 1, width: itemWidth, height, x: itemWidth + spacing, y: 0 },
      ],
    ];
  }

  if (count === 3) {
    const [img1] = imageDimensions;

    // Nếu ảnh đầu wide, cho nó full width ở trên
    if (img1.isWide) {
      const topHeight = containerWidth * 0.5;
      const bottomWidth = (containerWidth - spacing) / 2;
      const bottomHeight = containerWidth * 0.4;

      return [
        [
          { index: 0, width: containerWidth, height: topHeight, x: 0, y: 0 },
          {
            index: 1,
            width: bottomWidth,
            height: bottomHeight,
            x: 0,
            y: topHeight + spacing,
          },
          {
            index: 2,
            width: bottomWidth,
            height: bottomHeight,
            x: bottomWidth + spacing,
            y: topHeight + spacing,
          },
        ],
      ];
    }

    // Default: 1 lớn bên trái, 2 nhỏ bên phải
    const leftWidth = containerWidth * 0.65;
    const rightWidth = containerWidth * 0.35 - spacing;
    const rightHeight = sizes._160sdp;

    return [
      [
        {
          index: 0,
          width: leftWidth,
          height: rightHeight * 2 + spacing,
          x: 0,
          y: 0,
        },
        {
          index: 1,
          width: rightWidth,
          height: rightHeight,
          x: leftWidth + spacing,
          y: 0,
        },
        {
          index: 2,
          width: rightWidth,
          height: rightHeight,
          x: leftWidth + spacing,
          y: rightHeight + spacing,
        },
      ],
    ];
  }

  if (count === 4) {
    // Kiểm tra nếu có ảnh wide
    const hasWideImage = imageDimensions.some(img => img.isWide);

    if (hasWideImage) {
      // 1 ảnh wide ở trên, 3 ảnh ở dưới
      const topHeight = containerWidth * 0.5;
      const bottomWidth = (containerWidth - spacing * 2) / 3;
      const bottomHeight = containerWidth * 0.35;

      return [
        [
          { index: 0, width: containerWidth, height: topHeight, x: 0, y: 0 },
          {
            index: 1,
            width: bottomWidth,
            height: bottomHeight,
            x: 0,
            y: topHeight + spacing,
          },
          {
            index: 2,
            width: bottomWidth,
            height: bottomHeight,
            x: bottomWidth + spacing,
            y: topHeight + spacing,
          },
          {
            index: 3,
            width: bottomWidth,
            height: bottomHeight,
            x: (bottomWidth + spacing) * 2,
            y: topHeight + spacing,
          },
        ],
      ];
    }

    // Default: 2x2 grid
    const itemWidth = (containerWidth - spacing) / 2;
    const itemHeight = sizes._160sdp;

    return [
      [
        { index: 0, width: itemWidth, height: itemHeight, x: 0, y: 0 },
        {
          index: 1,
          width: itemWidth,
          height: itemHeight,
          x: itemWidth + spacing,
          y: 0,
        },
        {
          index: 2,
          width: itemWidth,
          height: itemHeight,
          x: 0,
          y: itemHeight + spacing,
        },
        {
          index: 3,
          width: itemWidth,
          height: itemHeight,
          x: itemWidth + spacing,
          y: itemHeight + spacing,
        },
      ],
    ];
  }

  // 5+ images: Layout Facebook style - 2 ảnh lớn trên, các ảnh nhỏ dưới
  const firstRowHeight = sizes._180sdp;
  const secondRowHeight = sizes._120sdp;
  const topImageWidth = (containerWidth - spacing) / 2;

  // First row: 2 ảnh lớn
  const firstRowItems = [
    {
      index: 0,
      width: topImageWidth,
      height: firstRowHeight,
      x: 0,
      y: 0,
    },
    {
      index: 1,
      width: topImageWidth,
      height: firstRowHeight,
      x: topImageWidth + spacing,
      y: 0,
    },
  ];

  // Second row: 3 ảnh nhỏ dưới với indicator +more
  const bottomWidth = (containerWidth - spacing * 2) / 3;
  const secondRowItems = images.slice(2, 5).map((_, i) => ({
    index: i + 2,
    width: bottomWidth,
    height: secondRowHeight,
    x: i * (bottomWidth + spacing),
    y: firstRowHeight + spacing,
  }));

  return [[...firstRowItems, ...secondRowItems]];
};

export const GridImage: FC<Props> = ({
  localImages,
  remoteImages,
  onPressImage,
  onDelete,
}) => {
  const { Colors } = useAppTheme();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [fullScreenVisible, setFullScreenVisible] = useState<boolean>(false);
  const localFormatImages = useMemo(
    () => localFilesToGridImages(localImages ?? []),
    [localImages],
  );
  const remoteFormatImages = useMemo(
    () => attachmentsToGridImages(remoteImages ?? []),
    [remoteImages],
  );
  const images: GridImageEntity[] = useMemo(
    () => [...localFormatImages, ...remoteFormatImages],
    [localFormatImages, remoteFormatImages],
  );

  const getItemKey = useCallback(
    (index: number) =>
      images[index]?.id ||
      (images[index] as any)?.fileName ||
      images[index]?.originalUrl ||
      String(index),
    [images],
  );

  // if (localImages) {
  //   images = localFilesToGridImages(localImages ?? []);
  // } else {
  //   images = attachmentsToGridImages(remoteImages ?? []);
  // }
  // Tạo layout thông minh dựa trên kích thước và số lượng ảnh
  const layout = useMemo(() => {
    if (!images || images.length === 0) {
      return [];
    }

    const smartLayouts = createSmartLayout(images, WIDTH_CONTAINER, SPACING);
    return smartLayouts.map(items => ({ items }));
  }, [images]);

  // Tính toán chiều cao động cho container
  const containerHeight = useMemo(() => {
    if (layout.length === 0) {
      return 0;
    }

    let maxHeight = 0;
    layout.forEach(row => {
      row.items.forEach(item => {
        const itemBottom = item.y + item.height;
        if (itemBottom > maxHeight) {
          maxHeight = itemBottom;
        }
      });
    });

    return maxHeight + sizes._16sdp; // Thêm padding bottom
  }, [layout]);

  // Nếu không có ảnh, không hiển thị gì
  if (!images || images.length === 0) {
    return null;
  }
  return (
    <Box style={styles.container}>
      {layout.map((row, rowIndex) => (
        <Box
          key={`row-${rowIndex}`}
          style={[styles.row, { height: containerHeight }]}
        >
          {row.items.map(item => (
            <TouchableOpacity
              key={getItemKey(item.index)}
              style={[
                styles.imageContainer,
                {
                  width: item.width,
                  height: item.height,
                  left: item.x,
                  top: item.y,
                },
              ]}
              onPress={() => {
                onPressImage && onPressImage(item.index);
                setFullScreenVisible(true);
                setActiveIndex(item.index);
              }}
              activeOpacity={ACTIVE_OPACITY_TOUCH}
            >
              {images[item.index].type === 'video' ? (
                <>
                  <Video
                    source={{ uri: images[item.index].originalUrl }}
                    style={styles.image}
                    resizeMode="cover"
                    paused={true}
                    controls={false}
                    poster={images[item.index].thumbnailUrl}
                    posterResizeMode="cover"
                    onLoad={() => {}}
                    onError={error => {
                      console.log('Video error:', error);
                    }}
                  />
                  <View style={styles.videoOverlay}>
                    <View style={styles.playButton}>
                      <VideoIcon
                        fill="white"
                        width={sizes._20sdp}
                        height={sizes._20sdp}
                      />
                    </View>
                  </View>
                </>
              ) : (
                <AppRemoteImage
                  style={styles.image}
                  uri={images[item.index].originalUrl}
                  thumbnailUri={images[item.index].thumbnailUrl}
                  resizeMode={'cover'}
                />
              )}
              {onDelete && (
                <TouchableOpacity
                  onPress={() => onDelete(images[item.index])}
                  style={[
                    {
                      backgroundColor: Colors.red,
                    },
                    styles.deleteButton,
                  ]}
                >
                  <CloseIcon fill={Colors.white} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </Box>
      ))}

      {images.length > 5 && (
        <Box
          style={[
            styles.moreContainer,
            {
              right: SPACING * 2 + sizes._16sdp,
              bottom: sizes._48sdp,
            },
          ]}
        >
          <AppText fontSize="12" fontFamily="content_regular" color="white">
            +{images.length - 5}
          </AppText>
        </Box>
      )}
      <FullScreenImageViewer
        images={images}
        visible={fullScreenVisible}
        initialIndex={activeIndex}
        onClose={() => setFullScreenVisible(false)}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    position: 'relative',
    width: '100%',
  },
  imageContainer: {
    position: 'absolute',
    borderRadius: sizes._8sdp,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  moreContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: sizes._24sdp,
    width: sizes._36sdp,
    height: sizes._36sdp,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  playButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: sizes._24sdp,
    width: sizes._48sdp,
    height: sizes._48sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    borderRadius: sizes._99sdp,
    width: sizes._28sdp,
    height: sizes._28sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
