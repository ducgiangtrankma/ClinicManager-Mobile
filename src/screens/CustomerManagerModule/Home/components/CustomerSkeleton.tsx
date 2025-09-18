/* eslint-disable react-native/no-inline-styles */
// CustomerItemSkeleton.tsx
import React, { FC, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Dimensions,
  DimensionValue,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { sizes } from '@src/utils';
import { useAppTheme } from '@src/common';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const R = 12;

interface SkeletonBoxProps {
  width: DimensionValue; // number | '70%' ...
  height: number;
  radius?: number;
  style?: ViewStyle;
}

/** Ô skeleton có hiệu ứng shimmer chạy ngang */
const SkeletonBox: FC<SkeletonBoxProps> = ({
  width,
  height,
  radius = 8,
  style,
}) => {
  const progress = useSharedValue(0);
  const { Colors } = useAppTheme();

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1200 }), -1, false);
  }, [progress]);

  const shimmerStyle = useAnimatedStyle(() => {
    // chạy từ trái ra phải theo bề rộng màn hình (không cần đo layout)
    const translateX = interpolate(
      progress.value,
      [0, 1],
      [-0.6 * SCREEN_WIDTH, 1.2 * SCREEN_WIDTH],
    );
    return { transform: [{ translateX }] };
  });

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          overflow: 'hidden',
          backgroundColor: Colors.grayBackground, // nền xám nhạt
        },
        style,
      ]}
    >
      {/* Dải sáng shimmer */}
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          shimmerStyle,
          {
            width: SCREEN_WIDTH * 0.35, // đủ rộng để nhìn như gradient
            opacity: 0.3,
            backgroundColor: '#FFFFFF',
          },
        ]}
      />
    </View>
  );
};

/** Một hàng skeleton theo layout CustomerItem */
const CustomerItemSkeletonRow: FC = () => {
  const { Colors } = useAppTheme();
  return (
    <View style={styles.shadowWrap}>
      <View style={[styles.card, { backgroundColor: Colors.white }]}>
        {/* Avatar */}
        <SkeletonBox
          width={sizes._32sdp}
          height={sizes._32sdp}
          radius={sizes._16sdp}
        />

        {/* Info (name + phone) */}
        <View style={styles.infoContainer}>
          <SkeletonBox
            width={'70%'}
            height={sizes._14sdp}
            style={{ marginBottom: sizes._8sdp }}
          />
          <SkeletonBox width={'50%'} height={sizes._12sdp} />
        </View>

        {/* Check icon placeholder */}
        <SkeletonBox width={sizes._20sdp} height={sizes._20sdp} radius={6} />
      </View>
    </View>
  );
};

interface ListProps {
  count?: number; // số item skeleton muốn hiển thị
}

/** Danh sách skeleton cho CustomerItem */
export const CustomerItemSkeleton: FC<ListProps> = ({ count = 3 }) => {
  return (
    <View>
      {Array.from({ length: count }).map((_, i) => (
        <CustomerItemSkeletonRow key={i} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: { flex: 1, marginHorizontal: sizes._12sdp },
  shadowWrap: {
    width: '100%',
    borderRadius: R,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: sizes._2sdp },
    shadowOpacity: 0.08,
    shadowRadius: sizes._2sdp,
    // Android shadow
    elevation: sizes._6sdp,
    // spacing giữa các item
    marginVertical: sizes._6sdp,
  },
  card: {
    borderRadius: R,
    paddingVertical: sizes._12sdp,
    paddingHorizontal: sizes._16sdp,
    overflow: 'hidden', // che shimmer tràn góc bo
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes._16sdp,
  },
});
//Code AI Gen
