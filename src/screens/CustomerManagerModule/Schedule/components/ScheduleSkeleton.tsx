import { Box } from '@src/components';
import { sizes } from '@src/utils';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';

interface ScheduleSkeletonProps {
  count?: number;
}

const SkeletonItem = () => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    );
    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerValue]);

  const opacity = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Box style={styles.dayGroup}>
      <Box style={styles.dateHeader}>
        {/* Date box skeleton */}
        <Animated.View style={[styles.dateBoxSkeleton, { opacity }]} />

        {/* Day label skeleton */}
        <Box style={styles.dayLabelContainer}>
          <Animated.View style={[styles.todayLabelSkeleton, { opacity }]} />
          <Animated.View style={[styles.dayLabelSkeleton, { opacity }]} />
        </Box>
      </Box>

      {/* Entry content skeleton */}
      <Box style={styles.entriesContainer}>
        <Box style={styles.entryItem}>
          <Box style={styles.timelineContainer}>
            <Animated.View style={[styles.timeTextSkeleton, { opacity }]} />
            <Box style={styles.timelineContent}>
              <Animated.View
                style={[styles.timelineDotSkeleton, { opacity }]}
              />
              <Animated.View
                style={[styles.timelineLineSkeleton, { opacity }]}
              />
            </Box>
          </Box>

          <Box style={styles.entryContentWrapper}>
            <Animated.View style={[styles.emojiSkeleton, { opacity }]} />
            <Box style={styles.entryTextContent}>
              <Animated.View style={[styles.titleSkeleton, { opacity }]} />
              <Animated.View style={[styles.contentSkeleton, { opacity }]} />
              <Box style={styles.photoContainer}>
                <Animated.View style={[styles.photoSkeleton, { opacity }]} />
                <Animated.View style={[styles.photoSkeleton, { opacity }]} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const ScheduleSkeleton = ({ count = 3 }: ScheduleSkeletonProps) => {
  return (
    <Box>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonItem key={index} />
      ))}
    </Box>
  );
};

const styles = StyleSheet.create({
  dayGroup: {
    marginBottom: sizes._24sdp,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizes._12sdp,
  },
  dateBoxSkeleton: {
    width: sizes._48sdp,
    height: sizes._48sdp,
    backgroundColor: '#DDD0C8',
    borderRadius: sizes._12sdp,
    marginHorizontal: sizes._12sdp,
  },
  dayLabelContainer: {
    flexDirection: 'column',
  },
  todayLabelSkeleton: {
    width: sizes._80sdp,
    height: sizes._20sdp,
    backgroundColor: '#DDD0C8',
    borderRadius: sizes._4sdp,
    marginBottom: sizes._4sdp,
  },
  dayLabelSkeleton: {
    width: sizes._60sdp,
    height: sizes._16sdp,
    backgroundColor: '#DDD0C8',
    borderRadius: sizes._4sdp,
  },
  entriesContainer: {
    marginLeft: sizes._4sdp,
  },
  entryItem: {
    flexDirection: 'row',
    marginBottom: sizes._12sdp,
  },
  timelineContainer: {
    width: sizes._60sdp,
    alignItems: 'center',
    marginRight: sizes._8sdp,
  },
  timeTextSkeleton: {
    width: sizes._40sdp,
    height: sizes._16sdp,
    backgroundColor: '#DDD0C8',
    borderRadius: sizes._4sdp,
    marginBottom: sizes._4sdp,
  },
  timelineContent: {
    flex: 1,
    alignItems: 'center',
  },
  timelineDotSkeleton: {
    width: sizes._8sdp,
    height: sizes._8sdp,
    borderRadius: sizes._4sdp,
    backgroundColor: '#DDD0C8',
    marginVertical: sizes._4sdp,
  },
  timelineLineSkeleton: {
    width: sizes._1sdp,
    height: sizes._60sdp,
    backgroundColor: '#DDD0C8',
  },
  entryContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: sizes._12sdp,
    padding: sizes._12sdp,
  },
  emojiSkeleton: {
    width: sizes._32sdp,
    height: sizes._32sdp,
    borderRadius: sizes._16sdp,
    backgroundColor: '#DDD0C8',
    marginRight: sizes._8sdp,
  },
  entryTextContent: {
    flex: 1,
  },
  titleSkeleton: {
    width: '80%',
    height: sizes._20sdp,
    backgroundColor: '#DDD0C8',
    borderRadius: sizes._4sdp,
    marginBottom: sizes._8sdp,
  },
  contentSkeleton: {
    width: '100%',
    height: sizes._16sdp,
    backgroundColor: '#DDD0C8',
    borderRadius: sizes._4sdp,
    marginBottom: sizes._8sdp,
  },
  photoContainer: {
    flexDirection: 'row',
    gap: sizes._8sdp,
  },
  photoSkeleton: {
    width: sizes._60sdp,
    height: sizes._60sdp,
    backgroundColor: '#DDD0C8',
    borderRadius: sizes._8sdp,
  },
});
