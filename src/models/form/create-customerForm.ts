import { AttachmentEntity, LocalFileEntity } from '../AttachmentEntity';
import { TreatmentEntity } from '../TreatmentEntity';

export interface CreateCustomerFormEntity {
  name: string;
  gender: string;
  type: string;
  stepTreatment: TreatmentEntity[];
  images: AttachmentEntity[];
  phoneNumber: string;
  leatherClassification: string;
  maternity: string;
  medicalHistory: string;
  preTreatment: string; // điều trị trước đó
  otherInfo: string; // thông tin khác
  skinCondition: string; // tình trạng da hiện tại
  routine: string;
  diagnostic: string; // chuẩn đoán
  note: string;
}

export interface CreateCustomerBodyData {
  name: string;
  gender: string;
  type: string;
  stepTreatment: TreatmentEntity[];
  images: LocalFileEntity[];
  phoneNumber: string;
  leatherClassification: string;
  maternity: string;
  medicalHistory: string;
  preTreatment: string; // điều trị trước đó
  otherInfo: string; // thông tin khác
  skinCondition: string; // tình trạng da hiện tại
  routine: string;
  diagnostic: string; // chuẩn đoán
  note: string;
}

export interface CreateCustomerPayload {
  name: string;
  gender: string;
  type: string;
  stepTreatment: TreatmentEntity[];
  images: string[];
  phoneNumber: string;
  leatherClassification: string;
  maternity: string;
  medicalHistory: string;
  preTreatment: string; // điều trị trước đó
  otherInfo: string; // thông tin khác
  skinCondition: string; // tình trạng da hiện tại
  routine: string;
  diagnostic: string; // chuẩn đoán
  note: string;
}

export interface UpdateCustomerPayload {
  name: string;
  gender: string;
  type: string;
  stepTreatment: TreatmentEntity[];
  images: string[];
  phoneNumber: string;
  leatherClassification: string;
  maternity: string;
  medicalHistory: string;
  preTreatment: string; // điều trị trước đó
  otherInfo: string; // thông tin khác
  skinCondition: string; // tình trạng da hiện tại
  routine: string;
  diagnostic: string; // chuẩn đoán
  note: string;
}
