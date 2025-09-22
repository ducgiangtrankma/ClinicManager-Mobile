export interface ScheduleEntity {
  id: string;
  implementationTime: string;
  title: string;
  description: string;
}
export enum ScheduleType {
  MONTH_CALENDAR = 'MONTH_CALENDAR',
  FULL_CALENDAR = 'FULL_CALENDAR',
}
export const dummySchedules: ScheduleEntity[] = [
  {
    id: '1',
    implementationTime: '2025-09-22T08:00:00Z',
    title: 'Ngân Baby',
    description: 'Kiểm tra da mặt. Chăm sóc da định kì',
  },
  {
    id: '2',
    implementationTime: '2025-09-22T10:30:00Z',
    title: 'Họp nhóm marketing',
    description: 'Thảo luận kế hoạch marketing cho quý IV.',
  },
  {
    id: '3',
    implementationTime: '2025-09-23T14:00:00Z',
    title: 'Đào tạo nhân viên mới',
    description: 'Tổ chức buổi đào tạo về quy trình tiếp đón khách hàng.',
  },
  {
    id: '4',
    implementationTime: '2025-09-24T09:15:00Z',
    title: 'Bảo trì hệ thống phần mềm',
    description: 'Cập nhật và bảo trì hệ thống quản lý khách hàng.',
  },
  {
    id: '5',
    implementationTime: '2025-09-25T15:45:00Z',
    title: 'Họp tổng kết tháng',
    description: 'Đánh giá hiệu suất và kết quả làm việc trong tháng.',
  },
];
