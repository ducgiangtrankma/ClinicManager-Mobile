import { UserEntity } from '@src/models';
import axiosClient from './axiosClient';
import { store } from '@src/redux';
const authUrl = '/auth';
export const AuthenticationService = {
  register: async (body: { email: string; password: string }) => {
    return axiosClient.post(`${authUrl}/register`, body);
  },

  verifyOtp: async (body: { email: string; otp: string }) => {
    return axiosClient.post(`${authUrl}/verify`, body);
  },

  signIn: async (body: { email: string; password: string }) => {
    return axiosClient.post<{
      user: UserEntity;
      accessToken: string;
      refreshToken: string;
    }>(`${authUrl}/login`, body);
  },

  forgotPassword: (body: { email: string }) => {
    return axiosClient.post<{
      message: string;
    }>(`${authUrl}/forgotPassword`, body, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
    });
  },

  updatePasswordByForgot: (body: {
    email: string;
    otp: string;
    password: string;
  }) => {
    return axiosClient.post<{
      message: string;
    }>(`${authUrl}/forgotPassword-update`, body, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
    });
  },
  logout: () => {
    return axiosClient.post(`${authUrl}/logout`, null, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
    });
  },

  delete: () => {
    return axiosClient.post(`${authUrl}/delete`, null, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
    });
  },
};
