export enum ScheduleType {
  MONTH_CALENDAR = 'MONTH_CALENDAR',
  FULL_CALENDAR = 'FULL_CALENDAR',
}
import { FacilityEntity } from './FacilityEntity';
import { TreatmentEntity } from './TreatmentEntity';

export interface ScheduleEntity {
  store: FacilityEntity;
  implementationDate: string;
  createBy: CreateBy;
  customer: Customer | null;
  treatment: TreatmentEntity | null;
  note: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface CreateBy {
  email: string;
  id: string;
}

export interface Customer {
  name: string;
  id: string;
}
