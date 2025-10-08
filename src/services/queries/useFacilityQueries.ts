import { store } from '@src/redux';
import { useQuery } from '@tanstack/react-query';
import { FacilityService } from '../facility-service';
import { queryKeys } from './queryKeys';

export const useFacilityQuery = () => {
  return useQuery({
    queryKey: queryKeys.facilityList.listFacility(
      store.getState().appReducer.user?.id ?? '',
    ),
    queryFn: async () => {
      //Call Api -> Response
      const response = await FacilityService.getFacility();
      return response.data;
    },
  });
};
