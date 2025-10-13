import {
  CreateCustomerPayload,
  CustomerDetailEntity,
  CustomerEntity,
  PaginationEntity,
  UpdateCustomerPayload,
} from '@src/models';
import { store } from '@src/redux';
import axiosClient from './axiosClient';
const customerUrl = '/customer';

export const CustomerService = {
  getListCustomer: (params: {
    page?: number;
    limit?: number;
    keyword?: string;
    fromDate?: string;
    toDate?: string;
  }) => {
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
  createCustomer: (body: CreateCustomerPayload) => {
    return axiosClient.post<any>(`${customerUrl}`, body, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },
  getCustomerDetail: (customerId: string) => {
    return axiosClient.get<CustomerDetailEntity>(
      `${customerUrl}/${customerId}`,
      {
        headers: {
          Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
        },
        timeout: 5000,
      },
    );
  },
  updateCustomer: (customerId: string, updateData: UpdateCustomerPayload) => {
    return axiosClient.put<any>(`${customerUrl}/${customerId}`, updateData, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },
  deleteCustomer: (customerId: string) => {
    return axiosClient.delete<any>(`${customerUrl}/${customerId}`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },
};
