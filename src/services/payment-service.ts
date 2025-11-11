import {
  BillEntity,
  BillErrorEntity,
  BillExportEntity,
  BillStatus,
  CreateBillPayload,
  PaginationEntity,
  PaymentHistory,
} from '@src/models';
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
  getListBillExport: (
    limit?: number,
    params?: {
      fromDate?: string;
      toDate?: string;
      status?: BillStatus;
    },
  ) => {
    return axiosClient.get<{
      bills: BillExportEntity[];
      pagination: PaginationEntity;
      summary: {
        totalSuccessAmount: number;
        totalPendingAmount: number;
        totalErrorAmount: number;
        totalAmount: number;
      };
    }>(`${paymentUrl}/bills`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      params: {
        limit: limit,
        ...params,
        status: BillStatus.WAIT_FOR_PAYMENT,
      },
      timeout: 5000,
    });
  },
  manualSyncSuccessBill: (billId: string) => {
    return axiosClient.post<BillEntity>(
      `${paymentUrl}/mark-success`,
      {
        billId: billId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
        },
        timeout: 5000,
      },
    );
  },
  getWebhookReconciliation: () => {
    return axiosClient.get<BillErrorEntity[]>(
      `${paymentUrl}/webhook-reconciliation`,
      {
        headers: {
          Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
        },
        params: {},
        timeout: 5000,
      },
    );
  },
};
