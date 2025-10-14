import { store } from '@src/redux';
import { useQuery } from '@tanstack/react-query';
import { ScheduleService } from '../schedule-service';
import { queryKeys } from './queryKeys';

export const useCalendarQuery = (month: string, year: string) => {
  return useQuery({
    queryKey: queryKeys.scheduleList.calendarEvents(
      store.getState().appReducer.user?.id ?? '',
      month,
      year,
    ),
    queryFn: async () => {
      const response = await ScheduleService.getCalendarEvents({
        month,
        year,
      });
      return response.data;
    },
  });
};
