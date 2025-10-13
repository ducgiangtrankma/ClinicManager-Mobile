import { FacilityEntity } from './FacilityEntity';

export interface CategoryEntity {
  sku: string;
  store: FacilityEntity;
  name: string;
  createdAt: string;
  updatedAt: string;
  productCount: number;
  id: string;
}

export interface CreateCategoryFormValuesEntity {
  sku: string;
  name: string;
  store: string;
}
