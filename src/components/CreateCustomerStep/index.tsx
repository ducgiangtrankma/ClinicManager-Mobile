import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  FadeInLeft,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { StepDoneIcon, StepInprogressIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import { _screen_width, sizes } from '@src/utils';

interface Props {
  currentStep: number;
}

const DASH_WIDTH =
  (_screen_width - sizes._24sdp * 2 - sizes._36sdp * 4 - sizes._8sdp * 6) / 3;

export const CreateCustomerProgress: FC<Props> = ({ currentStep }) => {
  const { Colors } = useAppTheme();

  // Animation value for progress width
  const progressWidth = useSharedValue(0);

  // Animate progress
  React.useEffect(() => {
    progressWidth.value = withRepeat(
      withTiming(DASH_WIDTH, { duration: 1000 }), // Animation duration (1s)
      -1, // Infinite repeat
      false, // Do not reverse
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animated style for progress
  const animatedStyle = useAnimatedStyle(() => ({
    width: progressWidth.value,
    backgroundColor: Colors.green,
  }));

  return (
    <Animated.View
      style={{ gap: sizes._24sdp }}
      entering={FadeInLeft.delay(100)}
    >
      <View style={styles.container}>
        {DATA.map((item, index) => (
          <View key={item.id} style={styles.processContainer}>
            {index <= currentStep ? (
              <StepDoneIcon color={Colors.green} />
            ) : (
              <StepInprogressIcon color={Colors.grayBackground} />
            )}

            {index !== DATA.length - 1 && (
              <View style={styles.progressContainer}>
                {/* Background (not active) */}
                <View
                  style={[
                    styles.progressBackground,
                    {
                      backgroundColor:
                        index < currentStep
                          ? Colors.green
                          : Colors.grayBackground,
                    },
                  ]}
                />
                {/* Animated Progress for the next step */}
                {index === currentStep && (
                  <Animated.View
                    style={[styles.progressAnimated, animatedStyle]}
                  />
                )}
              </View>
            )}
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: sizes._8sdp,
  },
  progressContainer: {
    width: DASH_WIDTH,
    height: sizes._2sdp,
    marginLeft: sizes._8sdp,
    position: 'relative',
    overflow: 'hidden',
  },
  progressBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  progressAnimated: {
    position: 'absolute',
    height: '100%',
  },
  processContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const DATA = [
  {
    id: '1',
  },
  {
    id: '2',
  },
  {
    id: '3',
  },
  {
    id: '4',
  },
];
