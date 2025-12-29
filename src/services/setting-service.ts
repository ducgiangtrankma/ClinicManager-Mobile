import { SystemSettingEntity } from '@src/models';
import axiosClient from './axiosClient';

const settingUrl = '/setting';
export const SettingService = {
  getSystemSetting: () => {
    return axiosClient.get<SystemSettingEntity>(`${settingUrl}`, {
      headers: {},
    });
  },
};
