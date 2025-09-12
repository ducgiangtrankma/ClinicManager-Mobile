import { StyleSheet, ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  horizontal: {
    flexDirection: 'row',
  },
});

export const gapStyle = (gap: number) => ({
  gap,
});

export const reverseStyle = (
  reverse: 'horizontal' | 'vertical',
): ViewStyle => ({
  flexDirection: reverse === 'horizontal' ? 'row-reverse' : 'column-reverse',
});

export const directionStyle = (
  direction: 'horizontal' | 'vertical',
): ViewStyle => ({
  flexDirection: direction === 'horizontal' ? 'row' : 'column',
});

export const justifyStyle = (
  justify:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-between'
    | 'space-around'
    | 'space-evenly',
): ViewStyle => ({
  justifyContent: justify,
});

export const alignStyle = (
  align: 'center' | 'flex-end' | 'flex-start' | 'stretch' | 'baseline',
): ViewStyle => ({
  alignItems: align,
});
