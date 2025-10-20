import { store } from '@src/redux';
import { useQuery } from '@tanstack/react-query';
import { ReportService } from '../report-service';
import { queryKeys } from './queryKeys';

export const useYearCustomerGrowthQuery = (year: string) => {
  return useQuery({
    queryKey: queryKeys.customerYearGrowth.listGrowth(
      store.getState().appReducer.user?.id ?? '',
    ),
    queryFn: async () => {
      const response = await ReportService.getYearCustomerGrowthReport(year);
      console.log('response', response);
      return response.data;
    },
  });
};
