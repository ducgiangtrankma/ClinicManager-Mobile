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

export enum EventType {
  APPOINTMENT = 'appointment',
  TREATMENT = 'treatment',
  CONSULTATION = 'consultation',
  FOLLOW_UP = 'follow_up',
  REMINDER = 'reminder',
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: EventType;
  time?: string;
  color?: string;
}

export interface DayEvents {
  [date: string]: CalendarEvent[];
}
