import { dispatch, useAppTheme } from '@src/common';
import { APP_SCREEN, navigate } from '@src/navigator';

import { RightArrowIcon } from '@src/assets';
import { _screen_width, sizes } from '@src/utils';
import React, { FC, useMemo, useRef, useState } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Circle, Defs, LinearGradient, Stop, Svg } from 'react-native-svg';
import { PageDot } from './PageDot';
import { PageItem } from './PageItem';
import { onDisableOnboarding } from '@src/redux';

interface Props {}
export interface DataType {
  title: string;
  description: string;
  shapes: any[];
}
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const OnBoardingScreen: FC<Props> = () => {
  const { Images, Colors } = useAppTheme();
  const { top: paddingTop } = useSafeAreaInsets();
  const scrollX = useSharedValue(0);
  const listRef = useRef<Animated.FlatList<DataType>>(null);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const data = useMemo(
    () => [
      {
        title: 'Theo dõi',
        description: 'Theo dõi điều trị khách hàng',
        shapes: [
          Images.abstractShape1,
          Images.abstractShape2,
          Images.abstractShape3,
          Images.abstractShape4,
        ],
      },
      {
        title: 'Quản lý',
        description: 'Quản lý khách hàng, vậ tư',
        shapes: [
          Images.clapperboard,
          Images.picture,
          Images.round,
          Images.square,
        ],
      },
      {
        title: 'Thống kê',
        description: 'Thống kê kết quả điều trị',
        shapes: [Images.mozy, Images.heart, Images.enso, Images.star],
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }) => {
      scrollX.value = x;
    },
  });

  const onNextPress = () => {
    if (currentPage === 2) {
      dispatch(onDisableOnboarding());
      navigate(APP_SCREEN.SIGNIN);
    } else {
      // @ts-ignore: Unreachable code error
      listRef.current?.scrollToIndex?.({
        index: currentPage + 1,
        animated: true,
      });
      if (Platform.OS === 'android') {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const backgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      scrollX.value,
      [0, _screen_width, _screen_width * 2],
      ['#E5AFAF', '#C4BCFF', '#C2D8BE'],
    ),
  }));

  const circleProps = useAnimatedProps(() => ({
    strokeDashoffset: interpolate(
      scrollX.value,
      [0, _screen_width, _screen_width * 2],
      [2 * Math.PI * 46 * 0.66, 2 * Math.PI * 46 * 0.33, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const renderPageItem = ({ item, index }: { item: any; index: number }) => {
    return <PageItem data={item} scrollX={scrollX} index={index} />;
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.container, { paddingTop }, backgroundStyle]}
      >
        <Animated.FlatList
          onMomentumScrollEnd={({
            nativeEvent: {
              contentOffset: { x },
            },
          }) => setCurrentPage(Math.round(x / _screen_width))}
          ref={listRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={20}
          onScroll={scrollHandler}
          data={data}
          renderItem={renderPageItem}
          keyExtractor={(_, index) => `${index}`}
        />
        <View style={styles.footer}>
          <View style={styles.pageIndicatorView}>
            {data.map((e, index) => (
              <PageDot key={index} scrollX={scrollX} index={index} />
            ))}
          </View>
          <View style={styles.btnContainer}>
            <Svg
              height={sizes._65sdp}
              width={sizes._65sdp}
              viewBox="0 0 100 100"
            >
              <Defs>
                <LinearGradient id="circle" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor={'#FF7A51'} />
                  <Stop offset="100%" stopColor={'#FFDB5C'} />
                </LinearGradient>
              </Defs>
              <AnimatedCircle
                transform="rotate(-90 50 50)"
                cx={50}
                cy={50}
                r={46}
                strokeWidth={4}
                stroke="url(#circle)"
                strokeDasharray={Math.PI * 2 * 46}
                strokeLinecap="round"
                fill={'#EEEEEE'}
                animatedProps={circleProps}
              />
            </Svg>
            <TouchableOpacity
              onPress={onNextPress}
              style={[
                styles.nextBtn,
                {
                  backgroundColor: Colors.white,
                },
              ]}
            >
              <RightArrowIcon color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'space-between',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    zIndex: 10,
  },
  footer: {
    height: 200,
  },
  pageIndicatorView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  nextBtn: {
    position: 'absolute',
    zIndex: 10,
    height: sizes._42sdp,
    width: sizes._42sdp,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
