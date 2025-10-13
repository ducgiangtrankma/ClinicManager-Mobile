import {
  CreateProductPayload,
  PaginationEntity,
  ProductDetailEntity,
  ProductEntity,
} from '@src/models';
import { store } from '@src/redux';
import axiosClient from './axiosClient';
const productUrl = '/products';
export const ProductService = {
  getListProduct: (params: {
    page?: number;
    limit?: number;
    keyword?: string;
  }) => {
    return axiosClient.get<{
      products: ProductEntity[];
      pagination: PaginationEntity;
    }>(`${productUrl}`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      params,
      timeout: 5000,
    });
  },
  getProductDetail: (productId: string) => {
    return axiosClient.get<ProductDetailEntity>(`${productUrl}/${productId}`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },
  createProduct: (body: CreateProductPayload) => {
    return axiosClient.post<any>(`${productUrl}`, body, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },
  updateProduct: (productId: string, body: CreateProductPayload) => {
    return axiosClient.put<any>(`${productUrl}/${productId}`, body, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },
  deleteProduct: (productId: string) => {
    return axiosClient.delete<any>(`${productUrl}/${productId}`, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
      },
      timeout: 5000,
    });
  },
};
