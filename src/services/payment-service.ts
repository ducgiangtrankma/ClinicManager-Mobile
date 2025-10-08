import { BillEntity, CreateBillPayload, PaymentHistory } from '@src/models';
import { store } from '@src/redux';
import axiosClient from './axiosClient';

const paymentUrl = '/payment';

export const PaymentService = {
  getPaymentHistory: (customerId: string) => {
    return axiosClient.get<PaymentHistory[]>(`${paymentUrl}/history`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      params: {
        customerId: customerId,
      },
      timeout: 5000,
    });
  },
  createBill: (body: CreateBillPayload) => {
    return axiosClient.post<BillEntity>(`${paymentUrl}/createBill`, body, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },
};
