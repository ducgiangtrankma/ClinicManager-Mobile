import { ProductSelected } from './ProductEntity';

export interface CustomerCostEntity {
  customerId: string;
  summary: Summary;
  treatments: Treatment[];
}

export interface Summary {
  totalTreatments: number;
  totalRevenue: number; // Tổng đã thanh toán
  totalCost: number; // Tổng cost (originPrice)
  totalProfit: number; // Lợi nhuận thực tế đã thu,
  totalExpectedProfit: number; // Lợi nhuận dự kiến khi thu đủ
  totalDebt: number; // Tổng còn nợ
  totalTreatmentFee: number; // Tổng chi phí dịch vụ
  averageProfitMargin: number; // % lợi nhuận trung bình trên số đã thu
  expectedAverageProfitMargin: number; // % lợi nhuận trung bình nếu thu đủ tiền
}

export interface Treatment {
  id: string;
  sessionName: string;
  title: string;
  implementationDate: string;
  totalTreatmentFee: number; // Chi phí khách hàng phải trả
  paid: number; // Đã thanh toán
  debt: number; // Còn nợ
  cost: number; // Cost (tổng originPrice * quantity)
  profit: number; // Lợi nhuận = paid - cost
  expectedProfit: number; //Lợi nhuận dự kiến (nếu thu đủ) totalTreatmentFee - cost
  profitMargin: string; // % lợi nhuận thực tế tính trên đã thu
  expectedProfitMargin: string; //% lợi nhuận nếu thu đủ
  cosmetics: ProductSelected[];
}
