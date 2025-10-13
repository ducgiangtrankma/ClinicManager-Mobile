import { store } from '@src/redux';
import { CustomerService } from '@src/services';
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';

// Original customer list query (always enabled)
export const useCustomerListQuery = (
  limit: number,
  keyword?: string,
  fromDate?: string,
  toDate?: string,
) => {
  const userId = store.getState().appReducer.user?.id ?? '';

  return useInfiniteQuery({
    queryKey: queryKeys.customerList.listCustomer(
      userId,
      limit,
      keyword,
      fromDate,
      toDate,
    ),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await CustomerService.getListCustomer({
        page: pageParam,
        limit,
        keyword: keyword !== '' ? keyword : undefined,
        fromDate,
        toDate,
      });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const { page, totalPages } = lastPage.pagination || {};
      if (!page || !totalPages) return undefined;
      return page < totalPages ? page + 1 : undefined;
    },
    select: data => {
      const flatCustomers = data.pages.flatMap(p => p.customers);
      const currentPage = data.pages.at(-1)?.pagination.page ?? 1;
      const totalPages = data.pages.at(-1)?.pagination.totalPages ?? 1;
      return {
        ...data,
        flatCustomers,
        pageInfo: { currentPage, totalPages },
      };
    },
    staleTime: 5 * 60 * 1000, // Data được coi là fresh trong 5 phút
    gcTime: 10 * 60 * 1000, // Cache được giữ trong 10 phút
  });
};
