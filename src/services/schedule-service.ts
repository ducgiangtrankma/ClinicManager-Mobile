import {
  CreateScheduleFormValuesEntity,
  ScheduleEntity,
  UpdateScheduleFormValuesEntity,
} from '@src/models';
import { store } from '@src/redux';
import axiosClient from './axiosClient';
const scheduleUrl = '/schedule';
export const ScheduleService = {
  getListSchedule: (params?: { startDate?: string; endDate?: string }) => {
    return axiosClient.get<ScheduleEntity[]>(`${scheduleUrl}`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      params,
      timeout: 5000,
    });
  },
  createSchedule: (body: CreateScheduleFormValuesEntity) => {
    return axiosClient.post<any>(`${scheduleUrl}`, body, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },
  updateSchedule: (
    scheduleId: string,
    body: UpdateScheduleFormValuesEntity,
  ) => {
    return axiosClient.put<ScheduleEntity>(
      `${scheduleUrl}/${scheduleId}`,
      body,
      {
        headers: {
          Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
        },
        timeout: 5000,
      },
    );
  },
  deleteSchedule: (scheduleId: string) => {
    return axiosClient.delete<any>(`${scheduleUrl}/${scheduleId}`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },
};
