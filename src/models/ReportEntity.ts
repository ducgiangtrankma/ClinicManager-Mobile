export interface GrowthStoreEntity {
  storeId: string;
  storeName: string;
  monthlyData: MonthlyDaum[];
  totalNewCustomers: number;
}

export interface MonthlyDaum {
  month: number;
  monthName: string;
  count: number;
}
export interface RevenueStoreEntity {
  storeId: string;
  storeName: string;
  expectedRevenue: number;
  actualRevenue: number;
  totalDebt: number;
  totalCost: number;
  profit: number;
  profitMargin: string;
}

export interface GrowthYearReportResponse {
  period: string;
  stores: GrowthStoreEntity[];
  grandTotal: number;
}

export interface RevenueReportResponse {
  period: {
    from: string; //2025-01-01
    to: string;
  };
  stores: RevenueStoreEntity[];
  summary: {
    totalExpectedRevenue: number;
    totalActualRevenue: number;
    totalDebt: number;
    totalCost: number;
    totalProfit: number;
    averageProfitMargin: string;
  };
}

export interface GrowthChartPoint {
  value: number;
  label: string;
  dataPointText: string;
}

export interface GrowthStoreChartData {
  storeId: string;
  storeName: string;
  totalNewCustomers: number;
  chartData: GrowthChartPoint[];
}
