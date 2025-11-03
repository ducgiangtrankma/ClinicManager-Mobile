import {
  getMessaging,
  getToken,
  registerDeviceForRemoteMessages,
} from '@react-native-firebase/messaging';

const getDeviceToken = async () => {
  try {
    const messaging = getMessaging(); // lấy instance
    await registerDeviceForRemoteMessages(messaging);
    return await getToken(messaging);
  } catch (error) {
    console.log('error', error);
  }
};
export { getDeviceToken };
