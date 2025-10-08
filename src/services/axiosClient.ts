import { dispatch } from '@src/common';
import { AppConfig } from '@src/config';
import { onLogout, onSetToken, store } from '@src/redux';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import DeviceInfo from 'react-native-device-info';

const apiUrl = __DEV__ ? 'http://localhost:8002/api/v1' : AppConfig.apiUrl;
// const apiUrl = 'http://192.168.0.108:8001/api/v1';

// const apiUrl = 'http://192.168.0.114:8001/api/v1';

export interface ResponseBase<T = any> {
  code: number;

  message?: string | undefined | null;

  data?: T;

  status: boolean;
}
const responseDefault: ResponseBase<any> = {
  code: -500,
  status: false,
  message: 'error',
  data: {},
};

export const handleResponseAxios = (res: AxiosResponse): ResponseBase<any> => {
  if (res.data) {
    return {
      code: res.data.statusCode,
      status: true,
      data: res.data.data,
      message: res.data.message ?? null,
    };
  }
  return responseDefault;
};
const AxiosInstance = axios.create({});
let refreshTokenRequest: Promise<{
  accessToken: string;
  refreshToken: string;
}> | null = null;
const axiosClient = axios.create({
  baseURL: apiUrl,
  paramsSerializer: (params: any) => queryString.stringify(params),
  timeout: 15000, // Default 15s
});
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const deviceId = await DeviceInfo.getUniqueId();
    config.headers['x-request-source'] = 'app';
    config.headers['device-id'] = deviceId;
    config.headers['store-id'] = store.getState().facilityReducer.facility?.id;
    config.headers['x-lang'] = store.getState().languageReducer.appLanguage;
    return config;
  },
);
// Refresh token function
export async function refresh_Token() {
  try {
    const refreshToken = store.getState().appReducer.refreshToken;
    const deviceId = await DeviceInfo.getUniqueId();
    const storeId = store.getState().languageReducer.appLanguage;
    const response = await AxiosInstance.post(
      `${apiUrl}/auth/refreshToken`,
      { refreshToken },
      {
        headers: {
          'device-id': deviceId,
          'store-id': storeId,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.log('Refresh Token Error', error);
    return null;
  }
}
axiosClient.interceptors.response.use(
  (response: any) => {
    if (response && response.data) {
      const result = handleResponseAxios(response);
      return result;
    }
    return response;
  },
  async error => {
    const originalRequest = error.config;
    // Lỗi timeout của Axios thường có code 'ECONNABORTED'
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        code: -408,
        status: false,
        message: 'Hệ thống quá tải. Vui lòng thử lại sau!',
        data: {},
      });
    }
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      if (!refreshTokenRequest) {
        refreshTokenRequest = refresh_Token();
      }
      const newToken = await refreshTokenRequest;
      refreshTokenRequest = null;

      if (newToken === null) {
        dispatch(onLogout());
        return Promise.reject(error);
      }
      dispatch(
        onSetToken({
          accessToken: newToken.accessToken,
          refreshToken: newToken.refreshToken,
        }),
      );
      originalRequest.headers.Authorization = 'Bearer ' + newToken.accessToken;
      return axiosClient(originalRequest);
    }
    return Promise.reject(error.response.data);
  },
);
export default axiosClient;
