import { ProductSelected } from '../ProductEntity';

export interface TreatmentCreateFormValuesEntity {
  implementation_date: string;
  title: string;
  note: string;
  cosmetics: ProductSelected[];
  // cosmetics: {
  //   id: string;
  //   quantity: number;
  //   price: number;
  //   origin_price: number;
  // }[];
  total_treatment_fee: number; // tổng số tiền điều trị của liệu trình
  debt: number; // công nợ
  paid: number; //Số tiền đã thanh toán
}
export interface TreatmentPaymentFormValuesEntity {
  total_treatment_fee: number;
  paid: number;
  debt: number;
  newPaid: number;
}
