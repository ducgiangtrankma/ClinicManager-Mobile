import {_screen_height, _screen_width} from '@src/utils';
import React, {FC, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
interface Props {
  uri: string;
  onSingleTap: () => void;
}
export const ZoomableImage: FC<Props> = ({uri, onSingleTap}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const [pinchScale, setPinchScale] = useState(1);
  const [panTranslate, setPanTranslate] = useState({x: 0, y: 0});
  const [isZoomed, setIsZoomed] = useState(false);

  const doubleTapRef = useRef(null);
  const pinchRef = useRef(null);
  const panRef = useRef(null);

  const onPinchGestureEvent = Animated.event([{nativeEvent: {scale: scale}}], {
    useNativeDriver: true,
  });

  const onPanGestureEvent = Animated.event(
    [{nativeEvent: {translationX: translateX, translationY: translateY}}],
    {useNativeDriver: true},
  );

  // Reset zoom when double tap
  const onDoubleTap = () => {
    if (isZoomed) {
      // Reset zoom
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();

      setPinchScale(1);
      setPanTranslate({x: 0, y: 0});
      setIsZoomed(false);
    } else {
      // Zoom to 2.5x
      Animated.spring(scale, {
        toValue: 2.5,
        useNativeDriver: true,
      }).start();

      setPinchScale(2.5);
      setIsZoomed(true);
    }
  };

  // Handle pinch end
  const onPinchHandlerStateChange = (event: {
    nativeEvent: {oldState: number; scale: number};
  }) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const newScale = pinchScale * event.nativeEvent.scale;
      setPinchScale(newScale < 1 ? 1 : newScale);

      // Update isZoomed state
      setIsZoomed(newScale > 1);

      scale.flattenOffset();
    }
  };

  // Handle pan end
  const onPanHandlerStateChange = (event: {
    nativeEvent: {oldState: number; translationX: number; translationY: number};
  }) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      // Only allow panning when zoomed
      if (pinchScale > 1) {
        setPanTranslate({
          x: panTranslate.x + event.nativeEvent.translationX,
          y: panTranslate.y + event.nativeEvent.translationY,
        });
      }

      translateX.flattenOffset();
      translateY.flattenOffset();
    }
  };

  // Handle tap (single tap)
  const onSingleTapEvent = (event: {nativeEvent: {state: number}}) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onSingleTap();
    }
  };
  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <TapGestureHandler
        onHandlerStateChange={onSingleTapEvent}
        waitFor={doubleTapRef}>
        <Animated.View style={styles.gestureContainer}>
          <TapGestureHandler
            ref={doubleTapRef}
            onHandlerStateChange={event => {
              if (event.nativeEvent.state === State.ACTIVE) {
                onDoubleTap();
              }
            }}
            numberOfTaps={2}>
            <Animated.View style={styles.gestureContainer}>
              <PinchGestureHandler
                ref={pinchRef}
                onGestureEvent={onPinchGestureEvent}
                onHandlerStateChange={onPinchHandlerStateChange}
                simultaneousHandlers={[panRef]}>
                <Animated.View style={styles.gestureContainer}>
                  <PanGestureHandler
                    ref={panRef}
                    onGestureEvent={onPanGestureEvent}
                    onHandlerStateChange={onPanHandlerStateChange}
                    simultaneousHandlers={[pinchRef]}
                    enabled={isZoomed}>
                    <Animated.View style={styles.gestureContainer}>
                      <Animated.Image
                        source={{uri}}
                        style={[
                          styles.zoomableImage,
                          {
                            transform: [{scale}, {translateX}, {translateY}],
                          },
                        ]}
                        resizeMode="contain"
                      />
                    </Animated.View>
                  </PanGestureHandler>
                </Animated.View>
              </PinchGestureHandler>
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  gestureContainer: {
    width: _screen_width,
    height: _screen_height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomableImage: {
    width: _screen_width,
    height: _screen_height,
  },
});
