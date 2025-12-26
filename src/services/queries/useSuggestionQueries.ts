import { SuggestionEntity } from '@src/models';
import { store } from '@src/redux';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { SuggestionService } from '../suggestion-service';

export const useSuggestionQuery = () => {
  const facilityId = store.getState().facilityReducer.facility?.id ?? '';

  return useQuery<SuggestionEntity>({
    queryKey: queryKeys.suggestion.list(facilityId),
    queryFn: async () => {
      const response = await SuggestionService.getSuggestion();
      return response.data;
    },
    enabled: !!facilityId,
  });
};
