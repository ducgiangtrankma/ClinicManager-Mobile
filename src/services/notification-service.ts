import { store } from '@src/redux';
import axiosClient from './axiosClient';
import { NotificationEntity } from '@src/models';

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
  getListNotification: (params: { page: number; limit: number }) => {
    return axiosClient.get<{
      notifications: NotificationEntity[];
      pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
      };
    }>(`${notificationUrl}`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      params,
    });
  },
};
