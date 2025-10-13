import { store } from '@src/redux';
import { useQuery } from '@tanstack/react-query';
import { ScheduleService } from '../schedule-service';
import { queryKeys } from './queryKeys';

export const useScheduleQuery = (startDate?: string, endDate?: string) => {
  return useQuery({
    queryKey: queryKeys.scheduleList.listSchedule(
      store.getState().appReducer.user?.id ?? '',
      startDate,
      endDate,
    ),
    queryFn: async () => {
      const response = await ScheduleService.getListSchedule({
        startDate,
        endDate,
      });
      return response.data;
    },
  });
};
