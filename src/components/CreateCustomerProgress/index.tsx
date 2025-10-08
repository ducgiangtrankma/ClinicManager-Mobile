import { useSelector } from '@src/common';
import { useAppTheme } from '@src/common/hooks';
import { sizes } from '@src/utils';
import React, { FC, useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../AppText';
import { Box } from '../Box';

interface Props {}

export const CreateCustomerLoadingProgress: FC<Props> = () => {
  const { isVisible, progress, message } = useSelector(
    x => x.createCustomerProgressReducer,
  );
  console.log(' x.createCustomerProgressReducer', isVisible);
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Fade out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, fadeAnim]);

  useEffect(() => {
    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress, progressAnim]);

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.topContainer,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        },
      ]}
      pointerEvents="none"
    >
      <Box
        style={[
          styles.container,
          {
            backgroundColor: Colors.green,
            marginTop: insets.top + 16,
          },
        ]}
      >
        <AppText
          translationKey={message}
          style={styles.whiteText}
          margin={{ mb: sizes._12sdp }}
        />
        <Box style={[styles.progressContainer, styles.progressBackground]}>
          <Animated.View
            style={[
              styles.progressBar,
              styles.whiteProgressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          />
        </Box>
        <AppText style={styles.whiteText}>{Math.round(progress)}%</AppText>
      </Box>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  container: {
    marginHorizontal: sizes._16sdp,
    paddingVertical: sizes._8sdp,
    paddingHorizontal: sizes._24sdp,
    borderRadius: sizes._24sdp,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  progressContainer: {
    width: '100%',
    height: sizes._6sdp,
    borderRadius: sizes._4sdp,
    overflow: 'hidden',
    marginBottom: sizes._8sdp,
  },
  progressBar: {
    height: '100%',
    borderRadius: sizes._4sdp,
  },
  whiteText: {
    color: '#FFFFFF',
  },
  progressBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  whiteProgressBar: {
    backgroundColor: '#FFFFFF',
  },
});
