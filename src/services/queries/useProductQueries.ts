import { store } from '@src/redux';

import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductService } from '../product-service';
import { queryKeys } from './queryKeys';

// Original customer list query (always enabled)
export const useProductListQuery = (limit: number, keyword?: string) => {
  const storeId = store.getState().facilityReducer.facility?.id ?? '';

  return useInfiniteQuery({
    queryKey: queryKeys.productList.listProduct(storeId, limit, keyword),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await ProductService.getListProduct({
        page: pageParam,
        limit,
        keyword: keyword !== '' ? keyword : undefined,
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
      const flatCustomers = data.pages.flatMap(p => p.products);
      const currentPage = data.pages.at(-1)?.pagination.page ?? 1;
      const totalPages = data.pages.at(-1)?.pagination.totalPages ?? 1;
      return {
        ...data,
        flatCustomers,
        pageInfo: { currentPage, totalPages },
      };
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });
};
