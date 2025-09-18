import { AttachmentEntity } from '../AttachmentEntity';
import { CUSTOMER_TYPE } from '../CustomerEntity';
import { TreatmentEntity } from '../TreatmentEntity';
import { Sex } from '../UserEntity';

export interface CreateCustomerFormEntity {
  name: string;
  gender: Sex;
  type: CUSTOMER_TYPE;
  stepTreatment: TreatmentEntity[];
  images: AttachmentEntity[];
  phoneNumber: string;
  leather_classification: string;
  maternity: string;
  medical_history: string;
  pre_treatment: string; // điều trị trước đó
  other_info: string; // thông tin khác
  skin_condition: string; // tình trạng da hiện tại
  routine: string;
  diagnostic: string; // chuẩn đoán
  note: string;
}
