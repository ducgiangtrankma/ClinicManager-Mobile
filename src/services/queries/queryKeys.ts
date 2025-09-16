// Cấu trúc: DOMAIN -> FEATURE -> PARAMETERS
//userId: string truyền vào key queries để xử lý việc cache data khi user logout và login tài khoản khác liên tục trên 1 thiết bị
export const queryKeys = {
  // Month calendar queries
  facilityList: {
    all: (userId?: string) => ['facilityList', userId] as const,
    listFacility: (userId: string) =>
      [...queryKeys.facilityList.all(userId), 'listFacility'] as const,
  },
  //   facilityList: {
  //     all: (userId?: string) => ['facilityList', userId] as const,
  //     listFacility: (userId: string, params: { page?: number; limit?: number }) =>
  //       [...queryKeys.facilityList.all(userId), 'listFacility', params] as const,
  //   },
} as const;

export type QueryKeys = typeof queryKeys;
