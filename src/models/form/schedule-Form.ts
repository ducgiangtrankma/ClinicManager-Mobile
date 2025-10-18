export interface CreateScheduleFormValuesEntity {
  store: string;
  implementationDate: string;
  note?: string;
  customer?: string;
  treatment?: string;
  eventId: string;
}
export interface UpdateScheduleFormValuesEntity {
  implementationDate?: string;
  note?: string;
}
