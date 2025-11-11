// Cấu trúc: DOMAIN -> FEATURE -> PARAMETERS

import { BillStatus } from '@src/models';

//userId: string truyền vào key queries để xử lý việc cache data khi user logout và login tài khoản khác liên tục trên 1 thiết bị
export const queryKeys = {
  // Month calendar queries
  facilityList: {
    all: (userId?: string) => ['facilityList', userId] as const,
    listFacility: (userId: string) =>
      [...queryKeys.facilityList.all(userId), 'listFacility'] as const,
  },
  customerList: {
    all: (userId?: string) => ['customerList', userId] as const,
    listCustomer: (
      userId: string,
      limit: number,
      keyword?: string,
      fromDate?: string,
      toDate?: string,
      hasDebt?: boolean,
    ) =>
      [
        ...queryKeys.customerList.all(userId),
        'listCustomer',
        {
          limit: limit,
          keyword,
          fromDate,
          toDate,
          hasDebt,
        },
      ] as const,
  },
  categoryList: {
    all: (storeId?: string) => ['categoryList', storeId] as const,
    listCategory: (storeId: string, limit: number, keyword?: string) =>
      [
        ...queryKeys.categoryList.all(storeId),
        'listCategory',
        {
          limit: limit,
          keyword,
        },
      ] as const,
  },
  productList: {
    all: (storeId?: string) => ['productList', storeId] as const,
    listProduct: (storeId: string, limit: number, keyword?: string) =>
      [
        ...queryKeys.productList.all(storeId),
        'listProduct',
        {
          limit: limit,
          keyword,
        },
      ] as const,
  },
  scheduleList: {
    all: (storeId?: string) => ['scheduleList', storeId] as const,
    listSchedule: (storeId: string, startDate?: string, endDate?: string) =>
      [
        ...queryKeys.scheduleList.all(storeId),
        'listSchedule',
        {
          startDate: startDate,
          endDate: endDate,
        },
      ] as const,
    calendarEvents: (storeId: string, month: string, year: string) =>
      [
        ...queryKeys.scheduleList.all(storeId),
        'calendarEvents',
        {
          month: month,
          endDate: year,
        },
      ] as const,
  },
  customerYearGrowth: {
    all: (userId?: string) => ['customerYearGrowth', userId] as const,
    listGrowth: (year: string) =>
      [
        ...queryKeys.facilityList.all(),
        'customerYearGrowth',
        { year: year },
      ] as const,
  },
  revenueGrowth: {
    all: (userId?: string) => ['revenueGrowth', userId] as const,
    listRevenue: (userId: string, fromDate: string, toDate: string) =>
      [
        ...queryKeys.revenueGrowth.all(userId),
        'revenueGrowth',
        {
          fromDate: fromDate,
          toDate: toDate,
        },
      ] as const,
  },

  notification: {
    all: (userId?: string) => ['notification', userId] as const,
    listNotification: (userId: string, limit: number) =>
      [
        ...queryKeys.notification.all(userId),
        'listNotification',
        {
          limit: limit,
        },
      ] as const,
  },
  billExport: {
    all: (storeId?: string) => ['billExport', storeId] as const,
    listBillExport: (
      storeId: string,
      limit: number,
      params?: {
        fromDate?: string;
        toDate?: string;
        status?: BillStatus;
        page?: number;
      },
    ) =>
      [...queryKeys.billExport.all(storeId), 'listBillExport', params] as const,
  },
  billError: {
    all: (storeId?: string) => ['billError', storeId] as const,
    listBillError: (storeId: string) =>
      [
        ...queryKeys.billExport.all(storeId),
        'listBillExport',
        storeId,
      ] as const,
  },
} as const;

export type QueryKeys = typeof queryKeys;
