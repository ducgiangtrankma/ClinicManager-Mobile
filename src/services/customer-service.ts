import { CustomerEntity, PaginationEntity } from '@src/models';
import { store } from '@src/redux';
import axiosClient from './axiosClient';
const customerUrl = '';

export const CustomerService = {
  getListCustomer: (params: { page?: number; limit?: number }) => {
    return axiosClient.get<{
      customers: CustomerEntity[];
      pagination: PaginationEntity;
    }>(`${customerUrl}`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      params,
      timeout: 5000,
    });
  },
};
