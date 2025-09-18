// Cấu trúc: DOMAIN -> FEATURE -> PARAMETERS
//userId: string truyền vào key queries để xử lý việc cache data khi user logout và login tài khoản khác liên tục trên 1 thiết bị
export const queryKeys = {
  // Month calendar queries
  facilityList: {
    all: (userId?: string) => ['facilityList', userId] as const,
    listFacility: (userId: string) =>
      [...queryKeys.facilityList.all(userId), 'listFacility'] as const,
  },
  customerList: {
    all: (userId?: string) => ['customerList', userId] as const,
    listCustomer: (userId: string, limit: number) =>
      [
        ...queryKeys.customerList.all(userId),
        'listCustomer',
        {
          limit: limit,
        },
      ] as const,
  },
} as const;

export type QueryKeys = typeof queryKeys;
