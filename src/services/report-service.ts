import { GrowthYearReportResponse, RevenueReportResponse } from '@src/models';
import { store } from '@src/redux';
import axiosClient from './axiosClient';
const reportUrp = '/report';
export const ReportService = {
  getYearCustomerGrowthReport: (year: string) => {
    return axiosClient.get<GrowthYearReportResponse>(
      `${reportUrp}/customer-growth?year=${year}&type=year`,
      {
        headers: {
          Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
        },
        params: {},
        timeout: 5000,
      },
    );
  },

  getRevenueReport: (params: { fromDate: string; toDate: string }) => {
    return axiosClient.get<RevenueReportResponse>(`${reportUrp}/revenue`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      params,
      timeout: 5000,
    });
  },
};
