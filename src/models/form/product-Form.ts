import { CategoryEntity } from '../CategoryEntity';

export interface CreateProductFormValuesEntity {
  sku: string;
  store: string;
  category: CategoryEntity | undefined;
  name: string;
  inventory: number;
  price: number;
  originPrice: number;
  description?: string;
}
export interface CreateProductPayload {
  sku: string;
  store: string;
  category: string;
  name: string;
  inventory: number;
  price: number;
  originPrice: number;
  description?: string;
}
