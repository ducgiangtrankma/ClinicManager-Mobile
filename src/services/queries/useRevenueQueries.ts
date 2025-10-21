import { store } from '@src/redux';
import { useQuery } from '@tanstack/react-query';
import { ReportService } from '../report-service';
import { queryKeys } from './queryKeys';

export const useRevenueQuery = (fromDate: string, toDate: string) => {
  return useQuery({
    queryKey: queryKeys.revenueGrowth.listRevenue(
      store.getState().appReducer.user?.id ?? '',
      fromDate,
      toDate,
    ),
    queryFn: async () => {
      const response = await ReportService.getRevenueReport({
        fromDate,
        toDate,
      });
      return response.data;
    },
  });
};
