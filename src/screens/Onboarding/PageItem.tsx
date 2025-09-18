import React, { FC, memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { _screen_width, sizes } from '@src/utils';
import { BallSvg } from '@src/assets';

import { AppText } from '@src/components';
import { DataType } from '.';
import { useAppTheme } from '@src/common';
interface PageItemProps {
  data: DataType;
  scrollX: any;
  index: number;
}
const PageItemContainer: FC<PageItemProps> = ({ ...props }) => {
  const { Colors } = useAppTheme();
  const { data, scrollX, index } = props;

  const inputRange = [
    (index - 1) * _screen_width,
    index * _screen_width,
    (index + 1) * _screen_width,
  ];
  const ballStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(
          scrollX.value,
          [0, _screen_width, _screen_width * 2],
          [0, 90, 180],
        )}deg`,
      },
    ],
  }));
  const descriptionStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scrollX.value,
          inputRange,
          [0.5, 1, 0.5],
          Extrapolation.CLAMP,
        ),
      },
    ],
    opacity: interpolate(scrollX.value, inputRange, [0, 1, 0]),
  }));

  const bubble1Position = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scrollX.value, inputRange, [0, 1, 0]),
      },
      {
        translateX: interpolate(scrollX.value, inputRange, [0, 130, 0]),
      },
      {
        translateY: interpolate(scrollX.value, inputRange, [0, 130, 0]),
      },
    ],
  }));
  const bubble2Position = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scrollX.value, inputRange, [0, 1, 0]),
      },
      {
        translateX: interpolate(scrollX.value, inputRange, [0, -130, 0]),
      },
      {
        translateY: interpolate(scrollX.value, inputRange, [0, -130, 0]),
      },
    ],
  }));
  const bubble3Position = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scrollX.value, inputRange, [0, 1, 0]),
      },
      {
        translateX: interpolate(scrollX.value, inputRange, [0, 130, 0]),
      },
      {
        translateY: interpolate(scrollX.value, inputRange, [0, -130, 0]),
      },
    ],
  }));
  const bubble4Position = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scrollX.value, inputRange, [0, 1, 0]),
      },
      {
        translateX: interpolate(scrollX.value, inputRange, [0, -130, 0]),
      },
      {
        translateY: interpolate(scrollX.value, inputRange, [0, 130, 0]),
      },
    ],
  }));
  return (
    <Animated.View style={[styles.pageItem]}>
      <View style={styles.center}>
        <View style={styles.center}>
          <Animated.View style={ballStyle}>
            <BallSvg size={300} />
          </Animated.View>
          <AppText
            fontFamily="content_bold"
            style={styles.titleTxt}
            color={Colors.white}
            fontSize={'32'}
          >
            {data.title}
          </AppText>
        </View>
        <Animated.View style={[styles.bubbleItem, bubble1Position]}>
          <Image
            source={data.shapes[0]}
            style={{ transform: [{ scale: 0.5 }] }}
          />
        </Animated.View>
        <Animated.View style={[styles.bubbleItem, bubble2Position]}>
          <Image
            source={data.shapes[1]}
            style={{ transform: [{ scale: 0.5 }] }}
          />
        </Animated.View>
        <Animated.View style={[styles.bubbleItem, bubble3Position]}>
          <Image
            source={data.shapes[2]}
            style={{ transform: [{ scale: 0.5 }] }}
          />
        </Animated.View>
        <Animated.View style={[styles.bubbleItem, bubble4Position]}>
          <Image
            source={data.shapes[3]}
            style={{ transform: [{ scale: 0.5 }] }}
          />
        </Animated.View>
      </View>

      <View style={styles.descriptionView}>
        <Animated.View style={descriptionStyle}>
          <AppText
            style={styles.descriptionContent}
            fontSize={'24'}
            fontFamily="content_semibold"
            color={Colors.white}
          >
            {data.description}
          </AppText>
        </Animated.View>
      </View>
    </Animated.View>
  );
};
export const PageItem = memo(PageItemContainer);
const styles = StyleSheet.create({
  pageItem: {
    flex: 1,
    width: _screen_width,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: sizes._23sdp,
  },
  titleTxt: {
    position: 'absolute',
    zIndex: 99,
  },
  descriptionView: {
    paddingHorizontal: 30,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleItem: {
    position: 'absolute',
    zIndex: -1,
    opacity: 0.3,
  },
  descriptionContent: { alignSelf: 'center' },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
