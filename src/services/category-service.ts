import { store } from '@src/redux';
import axiosClient from './axiosClient';
import {
  CategoryEntity,
  CreateCategoryFormValuesEntity,
  PaginationEntity,
} from '@src/models';
const categoryUrl = '/category';
export const CategoryService = {
  getListCategory: (params: {
    page?: number;
    limit?: number;
    keyword?: string;
  }) => {
    return axiosClient.get<{
      categories: CategoryEntity[];
      pagination: PaginationEntity;
    }>(`${categoryUrl}`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      params,
      timeout: 5000,
    });
  },
  getCategoryDetail: (categoryId: string) => {
    return axiosClient.get<CategoryEntity>(`${categoryUrl}/${categoryId}`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },
  createCategory: (body: CreateCategoryFormValuesEntity) => {
    return axiosClient.post<any>(`${categoryUrl}`, body, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },
  updateCategory: (
    categoryId: string,
    body: CreateCategoryFormValuesEntity,
  ) => {
    return axiosClient.put<any>(`${categoryUrl}/${categoryId}`, body, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },
  deleteCategory: (categoryId: string) => {
    return axiosClient.delete<any>(`${categoryUrl}/${categoryId}`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },
};
