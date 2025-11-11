import { store } from '@src/redux';
import { useQuery } from '@tanstack/react-query';
import { PaymentService } from '../payment-service';
import { queryKeys } from './queryKeys';

export const useBillErrorQuery = () => {
  return useQuery({
    queryKey: queryKeys.billError.listBillError(
      store.getState().appReducer.user?.id ?? '',
    ),
    queryFn: async () => {
      const response = await PaymentService.getWebhookReconciliation();
      return response.data;
    },
  });
};
