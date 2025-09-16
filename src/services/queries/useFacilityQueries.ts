import { dummyFacilities } from '@src/models';
import { store } from '@src/redux';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';

export const useFacilityQuery = () => {
  return useQuery({
    queryKey: queryKeys.facilityList.listFacility(
      store.getState().appReducer.user?.id ?? '',
    ),
    queryFn: async () => {
      //Call Api -> Response
      return dummyFacilities;
    },
  });
};
