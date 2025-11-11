import { TreatmentEntity } from './TreatmentEntity';

export enum BillType {
  ALL = 'ALL', // Thanh toán toàn bộ liệu trình ( tổng tất cả)
  TREATMENT = 'TREATMENT', // Thanh toán từng liệu trình
}

export interface CreateBillPayload {
  customer: string;
  type: BillType;
  treatmentId: string | null;
  paid: number;
}

export interface BillEntity {
  qrCode: string;
  bill: BillInfo;
  total: number;
  type: BillType;
  treatmentInfo: {
    title: string;
    totalTreatmentFee: number;
    estimatedDebtAfterPayment: number;
    description: string;
  }[];
}

export interface BillInfo {
  customer: string;
  createBy: string;
  type: string;
  treatmentId: any;
  voucher: any;
  total: number;
  discount: number;
  paymentTotal: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface PaymentHistory {
  id: string;
  customer: string;
  createBy: string;
  type: string;
  treatmentId: string;
  voucher: any;
  total: number;
  discount: number;
  paymentTotal: number;
  status: BillStatus;
  createdAt: string;
  treatment: TreatmentEntity;
  transactions: Transaction[];
  updatedAt: string;
}

export interface Transaction {
  id: string;
  amount: number;
  status: string;
  content: string;
  transactionId: string;
  createdAt: string;
}
export enum BillStatus {
  WAIT_FOR_PAYMENT = 'WAIT FOR PAYMENT', // chờ thanh toán
  PENDING = 'PENDING', // Bị treo
  SUCCESS = 'SUCCESS', // Thanh công
  ERROR = 'ERROR', // Lỗi
}

export interface BillExportEntity {
  customer: Customer;
  createBy: CreateBy;
  type: string;
  treatmentId: string;
  voucher: any;
  total: number;
  discount: number;
  paymentTotal: number;
  actualPayment: any;
  overpayment: any;
  status: BillStatus;
  createdAt: string;
  updatedAt: string;
  treatment: Treatment;
  id: string;
  transactions: Transaction[];
}

export interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
}

export interface CreateBy {
  id: string;
  email: string;
}

export interface Treatment {
  id: string;
  title: string;
  totalTreatmentFee: number;
  debt: number;
  paid: number;
}

export interface Transaction {
  id: string;
  transactionId: string;
  amount: number;
  status: string;
  content: string;
  createdAt: string;
}

export interface BillErrorEntity {
  id: string;
  gateway: string;
  transactionDate: string;
  accountNumber: string;
  content: string;
  transferAmount: number;
  referenceCode: string;
  errorReason: string;
  isResolved: boolean;
  resolvedAt: any;
  resolvedBy: any;
  resolvedNote: any;
  billId: any;
  createdAt: string;
  updatedAt: string;
  rawWebhookData: RawWebhookData;
}

export interface RawWebhookData {
  gateway: string;
  transactionDate: string;
  accountNumber: string;
  subAccount: any;
  code: any;
  content: string;
  transferType: string;
  description: string;
  transferAmount: number;
  referenceCode: string;
  accumulated: number;
  id: number;
}
