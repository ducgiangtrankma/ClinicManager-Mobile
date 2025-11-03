import { store } from '@src/redux';
import axiosClient from './axiosClient';

const notificationUrl = '/notification';
export const NotificationService = {
  registerTopic: (topicName: string) => {
    return axiosClient.post(
      `${notificationUrl}/subTopic`,
      { topicName },
      {
        headers: {
          Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
        },
      },
    );
  },
};
