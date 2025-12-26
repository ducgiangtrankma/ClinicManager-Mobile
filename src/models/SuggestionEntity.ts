export interface SuggestionEntity {
  store: string;
  createBy: string;
  medicalHistory: string[];
  preTreatment: string[];
  skinCondition: string[];
  routine: string[];
  diagnostic: string[];
  otherInfo: string[];
  note: string[];
  createdAt: string;
  updatedAt: string;
  id: string;
}
export enum SuggestionKey {
  MEDICAL_HISTORY = 'medicalHistory',
  PRE_TREATMENT = 'preTreatment',
  SKIN_CONDITION = 'skinCondition',
  ROUTINE = 'routine',
  DIAGNOSTIC = 'diagnostic',
  NOTE = 'note',
}
