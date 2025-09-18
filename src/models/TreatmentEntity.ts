import { AttachmentEntity } from './AttachmentEntity';

export interface TreatmentEntity {
  title: string;
  note: string;
  implementation_date: string;
  cosmetics: {
    id: string;
    quantity: number;
  }[];
  id: string;
  success: boolean;
  images: AttachmentEntity[];
  createdAt: string;
  updateAt: string;
  nativeEventId: string;
}
