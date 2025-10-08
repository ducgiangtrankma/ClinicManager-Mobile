import { CreateFacilityFormEntity, FacilityEntity } from '@src/models';
import axiosClient from './axiosClient';
import { store } from '@src/redux';
const FACILITY_URL = '/store';
export const FacilityService = {
  getFacility: () => {
    return axiosClient.get<FacilityEntity[]>(`${FACILITY_URL}`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
    });
  },
  createFacility: (body: CreateFacilityFormEntity) => {
    return axiosClient.post<any>(`${FACILITY_URL}`, body, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },
};
