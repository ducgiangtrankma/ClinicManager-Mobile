/* eslint-disable react-hooks/exhaustive-deps */
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

export type CustomOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface NotificationNativeInterface {
  checkPermission: () => void;
}

export interface RemoteNotification<T>
  extends CustomOmit<FirebaseMessagingTypes.RemoteMessage, 'data'> {
  // Nested data from fcm is string. carefully when use
  data?: T;
}

export const requestNotificationPermissions = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return granted;
  } else {
    const status = await messaging().requestPermission({
      alert: true,
      badge: true,
      sound: true,
    });
    return status;
  }
};

export const getDeviceToken = async () => {
  return messaging().getToken();
};

/**
 * Notification coming when app in foreground
 */
export const useInAppNotification = <T = any>(
  callback: (remoteNotification: RemoteNotification<T>) => any,
) => {
  // effect
  useEffect(() => {
    messaging().onMessage(
      callback as (message: FirebaseMessagingTypes.RemoteMessage) => any,
    );
  }, []);
};

/**
 * Notification coming when app in background or quit state
 */
export const useBackgroundNotification = <T = any>(
  callback: (remoteNotification: RemoteNotification<T>) => any,
) => {
  useEffect(() => {
    messaging().setBackgroundMessageHandler(
      callback as (message: FirebaseMessagingTypes.RemoteMessage) => any,
    );
  }, []);
};

/**
 * User click notification when app in background
 */
export const useBackgroundOpenedNotification = <T = any>(
  callback: (remoteNotification: RemoteNotification<T>) => any,
) => {
  // effect
  useEffect(() => {
    messaging().onNotificationOpenedApp(
      callback as (message: FirebaseMessagingTypes.RemoteMessage) => any,
    );
  }, []);
};

/**
 * User click notification when app in killed or quit state
 */
export const useKilledOpenedNotification = <T = any>(
  callback: (remoteNotification: RemoteNotification<T> | null) => any,
) => {
  // effect
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(
        callback as (
          message: FirebaseMessagingTypes.RemoteMessage | null,
        ) => any,
      );
  }, []);
};

export const useHandleClickNotification = () => {};

export async function subscribeTopic(topicID: string) {
  messaging()
    .subscribeToTopic(topicID)
    .then(() => {
      console.log(`Sub ${topicID} `);
    });
}

export function unSubscribeTopic(topicID: string) {
  messaging()
    .unsubscribeFromTopic(topicID)
    .then(() => {
      console.log(`un sub ${topicID}`);
    });
}
/* Using hook in function component sample

      useInAppNotification(mess => {
        console.log('Mess', mess);
      });

      useBackgroundNotification(mess => {
        console.log('Background mess', mess);
      });

      useBackgroundOpenedNotification(mess => {
        console.log('Click notification app running background', mess);
      });

      useKilledOpenedNotification(mess => {
        console.log('Click notification after kill app', mess);
      });

    */
