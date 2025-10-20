import { GrowthYearReportResponse } from '@src/models';
import { store } from '@src/redux';
import axiosClient from './axiosClient';
const reportUrp = '/report';
export const ReportService = {
  getYearCustomerGrowthReport: (year: string) => {
    console.log(
      'getYearCustomerGrowthReport',
      `${reportUrp}/customer-growth?year=${year}&type=year`,
    );
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
};
