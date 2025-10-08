import { ProductSelected } from '../ProductEntity';

export interface TreatmentCreateFormValuesEntity {
  implementation_date: string;
  title: string;
  note: string;
  cosmetics: ProductSelected[];
  totalTreatmentFee: number; // tổng số tiền điều trị của liệu trình
  debt: number;
  paid: number;
}

export interface TreatmentUpdateFormValuesEntity {
  implementation_date: string;
  title: string;
  note: string;
  cosmetics: ProductSelected[];
  totalTreatmentFee: number; // tổng số tiền điều trị của liệu trình
  debt: number;
  paid: number;
  images: any[];
}
export interface TreatmentPaymentFormValuesEntity {
  totalTreatmentFee: number;
  paid: number;
  debt: number;
  newPaid: number;
  voucher: string | null;
}
