import { AttachmentEntity } from './AttachmentEntity';
import { ProductSelected } from './ProductEntity';

export interface TreatmentEntity {
  title: string;
  note: string;
  implementation_date: string;
  cosmetics: ProductSelected[];
  id: string;
  success: boolean;
  images: AttachmentEntity[];
  createdAt: string;
  updateAt: string;
  nativeEventId: string;
  total_treatment_fee: number;
  paid: number;
  debt: number;
}
