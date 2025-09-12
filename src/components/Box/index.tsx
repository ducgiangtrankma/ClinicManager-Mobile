import React, { FC, ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  alignStyle,
  directionStyle,
  gapStyle,
  justifyStyle,
  reverseStyle,
  styles,
} from './styles';
enum Reverse {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

enum Direction {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

enum Justify {
  center = 'center',
  'flex-end' = 'flex-end',
  'flex-start' = 'flex-start',
  'space-between' = 'space-between',
  'space-around' = 'space-around',
  'space-evenly' = 'space-evenly',
}

enum Align {
  'flex-start' = 'flex-start',
  'flex-end' = 'flex-end',
  center = 'center',
  stretch = 'stretch',
  baseline = 'baseline',
}
interface Props {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  cover?: boolean;
  horizontal?: boolean;
  reverse?: keyof typeof Reverse;
  direction?: keyof typeof Direction;
  justify?: keyof typeof Justify;
  align?: keyof typeof Align;
  gap?: number;
}
export const Box: FC<Props> = ({
  children,
  style,
  cover,
  horizontal,
  reverse,
  justify,
  align,
  gap,
  direction,
}) => {
  return (
    <View
      style={[
        style,
        cover && styles.full,
        horizontal && styles.horizontal,
        !!reverse && reverseStyle(reverse),
        !!direction && directionStyle(direction),
        !!justify && justifyStyle(justify),
        !!align && alignStyle(align),
        !!gap && gapStyle(gap),
      ]}
    >
      {children}
    </View>
  );
};
