import { store } from '@src/redux';

import { BillStatus } from '@src/models';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PaymentService } from '../payment-service';
import { queryKeys } from './queryKeys';
export const useBillExportListQuery = (
  limit: number,
  params?: {
    fromDate?: string;
    toDate?: string;
    status?: BillStatus;
    page?: number;
  },
) => {
  const storeId = store.getState().facilityReducer.facility?.id ?? '';

  return useInfiniteQuery({
    queryKey: queryKeys.billExport.listBillExport(storeId, limit, params),
    queryFn: async () => {
      const response = await PaymentService.getListBillExport(limit, params);
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const { page, totalPages } = lastPage.pagination || {};
      if (!page || !totalPages) return undefined;
      return page < totalPages ? page + 1 : undefined;
    },
    select: data => {
      const flatBills = data.pages.flatMap(p => p.bills);
      const currentPage = data.pages.at(-1)?.pagination.page ?? 1;
      const totalPages = data.pages.at(-1)?.pagination.totalPages ?? 1;
      return {
        ...data,
        flatBills,
        pageInfo: { currentPage, totalPages },
      };
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });
};
