import { useAppTheme } from '@src/common';
import { sizes } from '@src/utils';
import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  padding?: boolean;
  disablePaddingBottom?: boolean;
  style?: StyleProp<ViewStyle>;
}
export const PageContainer: FC<Props> = ({
  children,
  padding,
  disablePaddingBottom,
  style,
}) => {
  const inset = useSafeAreaInsets();
  const { Colors } = useAppTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors.defaultPageBackground,
          paddingHorizontal: padding ? sizes._24sdp : sizes._0sdp,
          paddingTop: inset.top,
          paddingBottom: disablePaddingBottom ? sizes._0sdp : inset.bottom,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
