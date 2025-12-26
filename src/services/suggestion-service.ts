import { SuggestionEntity, SuggestionKey } from '@src/models';
import axiosClient from './axiosClient';
import { store } from '@src/redux';

const suggestionUrl = '/suggestion';
export const SuggestionService = {
  getSuggestion: () => {
    return axiosClient.get<SuggestionEntity>(
      `${suggestionUrl}/store/${store.getState().facilityReducer.facility?.id}`,
      {
        headers: {
          Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
        },
      },
    );
  },

  addSuggestionToKey: (body: { key: SuggestionKey; items: string[] }) => {
    return axiosClient.post<SuggestionEntity>(
      `${suggestionUrl}/store/${
        store.getState().facilityReducer.facility?.id
      }/add-items`,
      body,
      {
        headers: {
          Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
        },
        timeout: 5000,
      },
    );
  },

  deleteSuggestionByKey: (body: { key: SuggestionKey; items: string[] }) => {
    return axiosClient.delete<SuggestionEntity>(
      `${suggestionUrl}/store/${
        store.getState().facilityReducer.facility?.id
      }/remove-items`,
      {
        data: body,
        headers: {
          Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
        },
        timeout: 5000,
      },
    );
  },
};
