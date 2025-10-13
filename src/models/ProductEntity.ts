import { AttachmentEntity } from './AttachmentEntity';
import { CategoryEntity } from './CategoryEntity';
import { FacilityEntity } from './FacilityEntity';

export interface ProductEntity {
  sku: string;
  name: string;
  inventory: number;
  price: number;
  originPrice: number;
  description: string;
  category: CategoryEntity;
  store: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface ProductSelected extends ProductEntity {
  quantity: number;
}

export interface ProductDetailEntity {
  images: AttachmentEntity[];
  sku: string;
  name: string;
  inventory: number;
  price: number;
  originPrice: number;
  description: string;
  category: CategoryEntity;
  store: FacilityEntity;
  createdAt: string;
  updatedAt: string;
  id: string;
}
