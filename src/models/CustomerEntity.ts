import { AttachmentEntity } from './AttachmentEntity';
import { FacilityEntity } from './FacilityEntity';
import { TreatmentEntity } from './TreatmentEntity';
import { Gender } from './UserEntity';

export interface CustomerEntity {
  id: string;
  type: CUSTOMER_TYPE;
  gender: Gender;
  phoneNumber: string;
  treatments: TreatmentEntity[];
  images: AttachmentEntity[];
  leather_classification: string; // Phân loai da
  medical_history: string; // tiền sử bệnh lý
  pre_treatment: string; // điều trị trước đó
  other_info: string; // thông tin khác
  skin_condition: string; // tình trạng da hiện tại
  diagnostic: string; // chuẩn đoán
  completed: boolean;
  createBy: string;
  createdAt: string;
  debt: number; // công nợ
  paid: number; //Số tiền đã thanh toán
  payment_history: PaymentHistoryEntity[];
  store: string;
  name: string;
  maternity: string;
  medicalHistory: string;
  preTreatment: string;
  skinCondition: string;
  routine: string;
  otherInfo: string;
  note: string;
  stepTreatment: string[];
  totalTreatmentFee: string;

  isDelete: boolean;

  updatedAt: string;
}

export enum CUSTOMER_TYPE {
  treatment = 'treatment',
  retail = 'retail',
}
export interface PaymentHistoryEntity {
  treatment_id: string;
  treatment_name: string;
  total_treatment_fee: number; // tổng số tiền điều trị của liệu trình
  debt: number; // công nợ
  paid: number; //Số tiền đã thanh toán
  updateAt: string;
}

export interface CustomerDetailEntity {
  store: FacilityEntity;
  name: string;
  phoneNumber: string;
  gender: string;
  type: string;
  leatherClassification: string;
  maternity: string;
  medicalHistory: string;
  preTreatment: string;
  skinCondition: string;
  routine: string;
  diagnostic: string;
  otherInfo: string;
  note: string;
  images: AttachmentEntity[];
  completed: boolean;
  stepTreatment: any[];
  totalTreatmentFee: string;
  debt: string;
  paid: string;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}
