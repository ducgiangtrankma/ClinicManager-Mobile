import {
  CreateTreatmentPayload,
  CustomerCostEntity,
  TreatmentDetailEntity,
  TreatmentEntity,
  TreatmentUpdateFormValuesEntity,
} from '@src/models';
import { store } from '@src/redux';
import axiosClient from './axiosClient';

const treatmentUrl = '/treatment';

export const TreatmentService = {
  getListTreatment: (customerId: string) => {
    return axiosClient.get<TreatmentEntity[]>(`${treatmentUrl}`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      params: {
        customerId: customerId,
      },
      timeout: 5000,
    });
  },
  createTreatment: (body: CreateTreatmentPayload) => {
    return axiosClient.post<TreatmentEntity>(`${treatmentUrl}`, body, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },

  getTreatmentDetail: (treatmentId: string) => {
    return axiosClient.get<TreatmentDetailEntity>(
      `${treatmentUrl}/${treatmentId}`,
      {
        headers: {
          Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
        },

        timeout: 5000,
      },
    );
  },

  updateTreatment: (
    treatmentId: string,
    updateData: TreatmentUpdateFormValuesEntity,
  ) => {
    return axiosClient.put<any>(`${treatmentUrl}/${treatmentId}`, updateData, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },

  deleteTreatment: (treatmentId: string) => {
    return axiosClient.delete<any>(`${treatmentUrl}/${treatmentId}`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      params: {
        restoreInventory: true,
      },
      timeout: 5000,
    });
  },

  getCostAnalysis: (customerId: string) => {
    return axiosClient.get<CustomerCostEntity>(
      `${treatmentUrl}/cost-analysis/${customerId}`,
      {
        headers: {
          Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
        },

        timeout: 5000,
      },
    );
  },
};
