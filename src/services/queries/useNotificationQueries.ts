import { store } from '@src/redux';
import { NotificationService } from '@src/services';
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';

export const useNotificationQuery = (limit: number) => {
  const userId = store.getState().appReducer.user?.id ?? '';

  return useInfiniteQuery({
    queryKey: queryKeys.notification.listNotification(userId, limit),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await NotificationService.getListNotification({
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
    enabled: true,
    staleTime: 30 * 1000, // 30 giây
    gcTime: 60 * 1000, // 1 phút
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
