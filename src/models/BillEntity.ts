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
