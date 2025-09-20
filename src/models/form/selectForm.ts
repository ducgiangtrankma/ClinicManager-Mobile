import { CUSTOMER_TYPE } from '../CustomerEntity';

export interface CustomerTypeSelectEntity {
  id: string;
  label: string;
  value: CUSTOMER_TYPE;
}

export interface LeatherClassificationSelectEntity {
  id: string;
  label: string;
  value: string;
}

export interface MaternitySelectEntity {
  id: string;
  label: string;
  value: string;
}
