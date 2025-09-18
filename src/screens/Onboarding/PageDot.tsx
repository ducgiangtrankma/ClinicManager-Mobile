import { useAppTheme } from '@src/common';
import { _screen_width } from '@src/utils';
import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
interface Props {
  scrollX: any;
  index: number;
}
const PageDotContainer: FC<Props> = ({ ...props }) => {
  const { Colors } = useAppTheme();
  const { scrollX, index } = props;
  const inputRange = [
    _screen_width * (index - 1),
    _screen_width * index,
    _screen_width * (index + 1),
  ];
  const dotStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    ),
    width: interpolate(
      scrollX.value,
      inputRange,
      [8, 34, 8],
      Extrapolation.CLAMP,
    ),
  }));
  return (
    <Animated.View
      style={[
        styles.pageDot,
        {
          backgroundColor: Colors.white,
        },
        dotStyle,
      ]}
    />
  );
};
const styles = StyleSheet.create({
  pageDot: {
    height: 6,
    borderRadius: 99,
    marginHorizontal: 4,
  },
});
export const PageDot = memo(PageDotContainer);
