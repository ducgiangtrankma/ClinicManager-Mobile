import { store } from '@src/redux';
import axiosClient from './axiosClient';

const userUrl = '/user';
export const UserService = {
  registerDeviceInfo: (deviceToken: string) => {
    return axiosClient.post(
      `${userUrl}/registerDevice`,
      { deviceToken },
      {
        headers: {
          Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
        },
      },
    );
  },
};
