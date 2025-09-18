import { store } from '@src/redux';
import { CustomerService } from '@src/services';
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';

export const useCustomerQuery = (limit: number) => {
  const userId = store.getState().appReducer.user?.id ?? '';

  return useInfiniteQuery({
    queryKey: queryKeys.customerList.listCustomer(userId, limit),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await CustomerService.getListCustomer({
        page: pageParam,
        limit,
      });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      // Dựa theo API trả về
      return lastPage.pagination?.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined;
    },
  });
};
