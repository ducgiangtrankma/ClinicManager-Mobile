import { CustomerEntity } from './CustomerEntity';
import { ProductSelected } from './ProductEntity';
import { UserEntity } from './UserEntity';

export interface TreatmentEntity {
  customer: string;
  createBy: UserEntity;
  title: string;
  implementationDate: string;
  note: string;
  cosmetics: ProductSelected[];
  success: boolean;
  images: any[];
  totalTreatmentFee: number;
  debt: number;
  paid: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface CreateTreatmentPayload {
  customer: string;
  title: string;
  implementationDate: string; //'2024-01-15'
  note: string;
  cosmetics: ProductSelected[];
  totalTreatmentFee: number;
  debt: number;
  paid: number;
}

export interface TreatmentDetailEntity {
  customer: CustomerEntity;
  createBy: UserEntity;
  title: string;
  implementationDate: string;
  note: string;
  cosmetics: ProductSelected[];
  success: boolean;
  images: any[];
  totalTreatmentFee: number;
  debt: number;
  paid: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}
