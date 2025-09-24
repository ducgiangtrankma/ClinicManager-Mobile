import { AttachmentEntity } from './AttachmentEntity';
import { TreatmentEntity } from './TreatmentEntity';
import dayjs from 'dayjs';

import { Sex } from './userEntity';

export interface CustomerEntity {
  id: string;
  type: CUSTOMER_TYPE;
  gender: Sex;
  phoneNumber: string;
  profile: {
    name: string;
    avatar: AttachmentEntity;
  };
  treatments: TreatmentEntity[];
  images: AttachmentEntity[];
  leather_classification: string; // Phân loai da
  medical_history: string; // tiền sử bệnh lý
  pre_treatment: string; // điều trị trước đó
  other_info: string; // thông tin khác
  skin_condition: string; // tình trạng da hiện tại
  diagnostic: string; // chuẩn đoán
  completed: boolean;
  createBy: string;
  createdAt: string;
  debt: number; // công nợ
  paid: number; //Số tiền đã thanh toán
  payment_history: PaymentHistoryEntity[];
}

export enum CUSTOMER_TYPE {
  treatment = 'treatment',
  retail = 'retail',
}
export interface PaymentHistoryEntity {
  treatment_id: string;
  treatment_name: string;
  total_treatment_fee: number; // tổng số tiền điều trị của liệu trình
  debt: number; // công nợ
  paid: number; //Số tiền đã thanh toán
  updateAt: string;
}
export const customersDummy: CustomerEntity[] = [
  {
    id: 'cus_001',
    type: 'MEMBER' as any,
    gender: 'FEMALE' as any,
    phoneNumber: '0987654321',
    profile: {
      name: 'Nguyễn Thị Linh',
      avatar: {
        id: 'att_001',
        fileName: 'avatar_linh.jpg',
        type: 'image/jpeg',
        originalUrl: 'https://picsum.photos/id/1011/600/600',
        thumbnailUrl: 'https://picsum.photos/id/1011/120/120',
        iconUrl: 'https://picsum.photos/id/1011/48/48',
      },
    },
    treatments: [
      {
        id: 'tr_001',
        title: 'Điện di Vitamin C',
        note: 'Da hơi đỏ nhẹ sau 2h, dặn tránh nắng kỹ. Da hơi đỏ nhẹ sau 2h, dặn tránh nắng kỹ. Da hơi đỏ nhẹ sau 2h, dặn tránh nắng kỹ. Da hơi đỏ nhẹ sau 2h, dặn tránh nắng kỹ. Da hơi đỏ nhẹ sau 2h, dặn tránh nắng kỹ.',
        implementation_date: '2025-08-20T09:30:00.000Z',
        cosmetics: [
          {
            id: 'p2',
            sku: 'COS-002',
            createBy: 'staff01',
            name: 'Serum vitamin C',
            description: 'Làm sáng da và giảm thâm nám',
            inventory: 80,
            price: 320000,
            originPrice: 150000,
            category: 'Serum',
            createdAt: dayjs().subtract(3, 'day').toISOString(),
            updatedAt: null,
            images: [
              {
                fileName: 'serum_vitc.jpg',
                id: 'img2',
                type: 'image/jpeg',
                originalUrl:
                  'https://dummyimage.com/600x400/f9a602/fff&text=Serum+C',
                thumbnailUrl:
                  'https://dummyimage.com/200x200/f9a602/fff&text=Thumb',
                iconUrl: 'https://dummyimage.com/50x50/f9a602/fff&text=Icon',
              },
            ],
            _destroy: false,
            quantity: 2,
          },
          {
            id: 'p1',
            sku: 'COS-001',
            createBy: 'admin',
            name: 'Kem dưỡng ẩm ban ngày',
            description: 'Giúp cấp ẩm và bảo vệ da suốt 24h',
            inventory: 120,
            price: 250000,
            originPrice: 150000,
            category: 'Moisturizer',
            createdAt: dayjs().subtract(7, 'day').toISOString(),
            updatedAt: dayjs().toISOString(),
            images: [
              {
                fileName: 'kem_duong_am.jpg',
                id: 'img1',
                type: 'image/jpeg',
                originalUrl:
                  'https://dummyimage.com/600x400/89cff0/fff&text=Moisturizer',
                thumbnailUrl:
                  'https://dummyimage.com/200x200/89cff0/fff&text=Thumb',
                iconUrl: 'https://dummyimage.com/50x50/89cff0/fff&text=Icon',
              } as AttachmentEntity,
            ],
            _destroy: false,
            quantity: 3,
          },
        ],
        success: true,
        images: [
          {
            id: 'att_001_1',
            fileName: 'treat_001_before.jpg',
            type: 'image/jpeg',
            originalUrl: 'https://picsum.photos/id/1021/800/600',
            thumbnailUrl: 'https://picsum.photos/id/1021/160/120',
            iconUrl: 'https://picsum.photos/id/1021/48/48',
          },
        ],
        createdAt: '2025-08-20T10:00:00.000Z',
        updateAt: '2025-08-20T10:10:00.000Z',
        nativeEventId: 'evt_8L1A',
        total_treatment_fee: 200000,
        paid: 10000,
        debt: 40000,
      },
      {
        id: 'tr_002',
        title: 'Peel da AHA/BHA',
        note: 'Tái khám sau 1 tuần.',
        implementation_date: '2025-09-05T08:00:00.000Z',
        cosmetics: [
          {
            id: 'p1',
            sku: 'COS-001',
            createBy: 'admin',
            name: 'Kem dưỡng ẩm ban ngày',
            description: 'Giúp cấp ẩm và bảo vệ da suốt 24h',
            inventory: 120,
            price: 250000,
            originPrice: 150000,
            category: 'Moisturizer',
            createdAt: dayjs().subtract(7, 'day').toISOString(),
            updatedAt: dayjs().toISOString(),
            images: [
              {
                fileName: 'kem_duong_am.jpg',
                id: 'img1',
                type: 'image/jpeg',
                originalUrl:
                  'https://dummyimage.com/600x400/89cff0/fff&text=Moisturizer',
                thumbnailUrl:
                  'https://dummyimage.com/200x200/89cff0/fff&text=Thumb',
                iconUrl: 'https://dummyimage.com/50x50/89cff0/fff&text=Icon',
              } as AttachmentEntity,
            ],
            _destroy: false,
            quantity: 3,
          },
        ],
        success: false,
        images: [],
        createdAt: '2025-09-05T08:50:00.000Z',
        updateAt: '2025-09-05T08:55:00.000Z',
        nativeEventId: 'evt_9K2B',
        total_treatment_fee: 200000,
        paid: 10000,
        debt: 40000,
      },
      {
        id: 'tr_003',
        title: 'Peel da AHA/BHA',
        note: 'Tái khám sau 1 tuần.',
        implementation_date: '2025-09-05T08:00:00.000Z',
        cosmetics: [
          {
            id: 'p1',
            sku: 'COS-001',
            createBy: 'admin',
            name: 'Kem dưỡng ẩm ban ngày',
            description: 'Giúp cấp ẩm và bảo vệ da suốt 24h',
            inventory: 120,
            price: 250000,
            originPrice: 150000,
            category: 'Moisturizer',
            createdAt: dayjs().subtract(7, 'day').toISOString(),
            updatedAt: dayjs().toISOString(),
            images: [
              {
                fileName: 'kem_duong_am.jpg',
                id: 'img1',
                type: 'image/jpeg',
                originalUrl:
                  'https://dummyimage.com/600x400/89cff0/fff&text=Moisturizer',
                thumbnailUrl:
                  'https://dummyimage.com/200x200/89cff0/fff&text=Thumb',
                iconUrl: 'https://dummyimage.com/50x50/89cff0/fff&text=Icon',
              } as AttachmentEntity,
            ],
            _destroy: false,
            quantity: 3,
          },
        ],
        success: false,
        images: [],
        createdAt: '2025-09-05T08:50:00.000Z',
        updateAt: '2025-09-05T08:55:00.000Z',
        nativeEventId: 'evt_9K2B',
        total_treatment_fee: 200000,
        paid: 10000,
        debt: 40000,
      },
      {
        id: 'tr_004',
        title: 'Peel da AHA/BHA',
        note: 'Tái khám sau 1 tuần.',
        implementation_date: '2025-09-05T08:00:00.000Z',
        cosmetics: [
          {
            id: 'p1',
            sku: 'COS-001',
            createBy: 'admin',
            name: 'Kem dưỡng ẩm ban ngày',
            description: 'Giúp cấp ẩm và bảo vệ da suốt 24h',
            inventory: 120,
            price: 250000,
            originPrice: 150000,
            category: 'Moisturizer',
            createdAt: dayjs().subtract(7, 'day').toISOString(),
            updatedAt: dayjs().toISOString(),
            images: [
              {
                fileName: 'kem_duong_am.jpg',
                id: 'img1',
                type: 'image/jpeg',
                originalUrl:
                  'https://dummyimage.com/600x400/89cff0/fff&text=Moisturizer',
                thumbnailUrl:
                  'https://dummyimage.com/200x200/89cff0/fff&text=Thumb',
                iconUrl: 'https://dummyimage.com/50x50/89cff0/fff&text=Icon',
              } as AttachmentEntity,
            ],
            _destroy: false,
            quantity: 3,
          },
        ],
        success: false,
        images: [],
        createdAt: '2025-09-05T08:50:00.000Z',
        updateAt: '2025-09-05T08:55:00.000Z',
        nativeEventId: 'evt_9K2B',
        total_treatment_fee: 200000,
        paid: 10000,
        debt: 40000,
      },
      {
        id: 'tr_005',
        title: 'Điện di Vitamin C',
        note: 'Da hơi đỏ nhẹ sau 2h, dặn tránh nắng kỹ. Da hơi đỏ nhẹ sau 2h, dặn tránh nắng kỹ. Da hơi đỏ nhẹ sau 2h, dặn tránh nắng kỹ. Da hơi đỏ nhẹ sau 2h, dặn tránh nắng kỹ. Da hơi đỏ nhẹ sau 2h, dặn tránh nắng kỹ.',
        implementation_date: '2025-08-20T09:30:00.000Z',
        cosmetics: [
          {
            id: 'p2',
            sku: 'COS-002',
            createBy: 'staff01',
            name: 'Serum vitamin C',
            description: 'Làm sáng da và giảm thâm nám',
            inventory: 80,
            price: 320000,
            originPrice: 150000,
            category: 'Serum',
            createdAt: dayjs().subtract(3, 'day').toISOString(),
            updatedAt: null,
            images: [
              {
                fileName: 'serum_vitc.jpg',
                id: 'img2',
                type: 'image/jpeg',
                originalUrl:
                  'https://dummyimage.com/600x400/f9a602/fff&text=Serum+C',
                thumbnailUrl:
                  'https://dummyimage.com/200x200/f9a602/fff&text=Thumb',
                iconUrl: 'https://dummyimage.com/50x50/f9a602/fff&text=Icon',
              },
            ],
            _destroy: false,
            quantity: 2,
          },
          {
            id: 'p1',
            sku: 'COS-001',
            createBy: 'admin',
            name: 'Kem dưỡng ẩm ban ngày',
            description: 'Giúp cấp ẩm và bảo vệ da suốt 24h',
            inventory: 120,
            price: 250000,
            originPrice: 150000,
            category: 'Moisturizer',
            createdAt: dayjs().subtract(7, 'day').toISOString(),
            updatedAt: dayjs().toISOString(),
            images: [
              {
                fileName: 'kem_duong_am.jpg',
                id: 'img1',
                type: 'image/jpeg',
                originalUrl:
                  'https://dummyimage.com/600x400/89cff0/fff&text=Moisturizer',
                thumbnailUrl:
                  'https://dummyimage.com/200x200/89cff0/fff&text=Thumb',
                iconUrl: 'https://dummyimage.com/50x50/89cff0/fff&text=Icon',
              } as AttachmentEntity,
            ],
            _destroy: false,
            quantity: 3,
          },
        ],
        success: true,
        images: [
          {
            id: 'att_001_1',
            fileName: 'treat_001_before.jpg',
            type: 'image/jpeg',
            originalUrl: 'https://picsum.photos/id/1021/800/600',
            thumbnailUrl: 'https://picsum.photos/id/1021/160/120',
            iconUrl: 'https://picsum.photos/id/1021/48/48',
          },
        ],
        createdAt: '2025-08-20T10:00:00.000Z',
        updateAt: '2025-08-20T10:10:00.000Z',
        nativeEventId: 'evt_8L1A',
        total_treatment_fee: 200000,
        paid: 10000,
        debt: 40000,
      },
      {
        id: 'tr_006',
        title: 'Điện di Vitamin C',
        note: 'Da hơi đỏ nhẹ sau 2h, dặn tránh nắng kỹ. Da hơi đỏ nhẹ sau 2h, dặn tránh nắng kỹ. Da hơi đỏ nhẹ sau 2h, dặn tránh nắng kỹ. Da hơi đỏ nhẹ sau 2h, dặn tránh nắng kỹ. Da hơi đỏ nhẹ sau 2h, dặn tránh nắng kỹ.',
        implementation_date: '2025-08-20T09:30:00.000Z',
        cosmetics: [
          {
            id: 'p2',
            sku: 'COS-002',
            createBy: 'staff01',
            name: 'Serum vitamin C',
            description: 'Làm sáng da và giảm thâm nám',
            inventory: 80,
            price: 320000,
            originPrice: 150000,
            category: 'Serum',
            createdAt: dayjs().subtract(3, 'day').toISOString(),
            updatedAt: null,
            images: [
              {
                fileName: 'serum_vitc.jpg',
                id: 'img2',
                type: 'image/jpeg',
                originalUrl:
                  'https://dummyimage.com/600x400/f9a602/fff&text=Serum+C',
                thumbnailUrl:
                  'https://dummyimage.com/200x200/f9a602/fff&text=Thumb',
                iconUrl: 'https://dummyimage.com/50x50/f9a602/fff&text=Icon',
              },
            ],
            _destroy: false,
            quantity: 2,
          },
          {
            id: 'p1',
            sku: 'COS-001',
            createBy: 'admin',
            name: 'Kem dưỡng ẩm ban ngày',
            description: 'Giúp cấp ẩm và bảo vệ da suốt 24h',
            inventory: 120,
            price: 250000,
            originPrice: 150000,
            category: 'Moisturizer',
            createdAt: dayjs().subtract(7, 'day').toISOString(),
            updatedAt: dayjs().toISOString(),
            images: [
              {
                fileName: 'kem_duong_am.jpg',
                id: 'img1',
                type: 'image/jpeg',
                originalUrl:
                  'https://dummyimage.com/600x400/89cff0/fff&text=Moisturizer',
                thumbnailUrl:
                  'https://dummyimage.com/200x200/89cff0/fff&text=Thumb',
                iconUrl: 'https://dummyimage.com/50x50/89cff0/fff&text=Icon',
              } as AttachmentEntity,
            ],
            _destroy: false,
            quantity: 3,
          },
        ],
        success: true,
        images: [
          {
            id: 'att_001_1',
            fileName: 'treat_001_before.jpg',
            type: 'image/jpeg',
            originalUrl: 'https://picsum.photos/id/1021/800/600',
            thumbnailUrl: 'https://picsum.photos/id/1021/160/120',
            iconUrl: 'https://picsum.photos/id/1021/48/48',
          },
        ],
        createdAt: '2025-08-20T10:00:00.000Z',
        updateAt: '2025-08-20T10:10:00.000Z',
        nativeEventId: 'evt_8L1A',
        total_treatment_fee: 200000,
        paid: 10000,
        debt: 40000,
      },
    ],
    images: [
      {
        id: 'att_001_g1',
        fileName: 'gallery_1.jpg',
        type: 'image/jpeg',
        originalUrl: 'https://picsum.photos/id/103/1000/750',
        thumbnailUrl: 'https://picsum.photos/id/103/200/150',
        iconUrl: 'https://picsum.photos/id/103/48/48',
      },
    ],
    leather_classification: 'Da hỗn hợp thiên khô',
    medical_history: 'Không dị ứng thuốc; tiền sử mụn nội tiết.',
    pre_treatment: 'Đã peel nồng độ thấp 2 lần (2025-07).',
    other_info: 'Thường xuyên đi nắng, ít dùng kem chống nắng.',
    skin_condition: 'Không đều màu, lỗ chân lông to vùng mũi.',
    diagnostic: 'Tăng sắc tố nhẹ, thiếu ẩm bề mặt.',
    completed: false,
    createBy: 'therapist01',
    createdAt: '2025-08-15T03:12:00.000Z',
    payment_history: [],
    debt: 0,
    paid: 0,
  },
  {
    id: 'cus_002',
    type: 'LEAD' as any,
    gender: 'MALE' as any,
    phoneNumber: '0901234567',
    profile: {
      name: 'Trần Minh Quân',
      avatar: {
        id: 'att_002',
        fileName: 'avatar_quan.jpg',
        type: 'image/jpeg',
        originalUrl: 'https://picsum.photos/id/1005/600/600',
        thumbnailUrl: 'https://picsum.photos/id/1005/120/120',
        iconUrl: 'https://picsum.photos/id/1005/48/48',
      },
    },
    treatments: [
      {
        id: 'tr_003',
        title: 'Nặn mụn chuẩn y khoa',
        note: 'Cho dùng kháng viêm tại chỗ 3 ngày.',
        implementation_date: '2025-09-01T07:30:00.000Z',
        cosmetics: [
          {
            id: 'p1',
            sku: 'COS-001',
            createBy: 'admin',
            name: 'Kem dưỡng ẩm ban ngày',
            description: 'Giúp cấp ẩm và bảo vệ da suốt 24h',
            inventory: 120,
            price: 250000,
            originPrice: 150000,
            category: 'Moisturizer',
            createdAt: dayjs().subtract(7, 'day').toISOString(),
            updatedAt: dayjs().toISOString(),
            images: [
              {
                fileName: 'kem_duong_am.jpg',
                id: 'img1',
                type: 'image/jpeg',
                originalUrl:
                  'https://dummyimage.com/600x400/89cff0/fff&text=Moisturizer',
                thumbnailUrl:
                  'https://dummyimage.com/200x200/89cff0/fff&text=Thumb',
                iconUrl: 'https://dummyimage.com/50x50/89cff0/fff&text=Icon',
              } as AttachmentEntity,
            ],
            _destroy: false,
            quantity: 3,
          },
        ],
        success: true,
        images: [],
        createdAt: '2025-09-01T08:10:00.000Z',
        updateAt: '2025-09-01T08:12:00.000Z',
        nativeEventId: 'evt_X1P0',
        total_treatment_fee: 200000,
        paid: 10000,
        debt: 40000,
      },
    ],
    images: [],
    leather_classification: 'Da dầu',
    medical_history: 'Viêm da tiết bã nhẹ.',
    pre_treatment: 'Dùng BPO 2.5% không đều.',
    other_info: 'Thức khuya thường xuyên.',
    skin_condition: 'Mụn viêm rải rác hai bên má.',
    diagnostic: 'Mụn viêm mức độ nhẹ-trung bình.',
    completed: true,
    createBy: 'reception',
    createdAt: '2025-08-28T02:00:00.000Z',
    payment_history: [],
    debt: 0,
    paid: 0,
  },
  {
    id: 'cus_003',
    type: 'VIP' as any,
    gender: 'FEMALE' as any,
    phoneNumber: '0912345678',
    profile: {
      name: 'Lê Thu Trang',
      avatar: {
        id: 'att_003',
        fileName: 'avatar_trang.jpg',
        type: 'image/jpeg',
        originalUrl: 'https://picsum.photos/id/1012/600/600',
        thumbnailUrl: 'https://picsum.photos/id/1012/120/120',
        iconUrl: 'https://picsum.photos/id/1012/48/48',
      },
    },
    treatments: [
      {
        id: 'tr_004',
        title: 'RF nâng cơ',
        note: 'Hẹn lịch duy trì sau 4 tuần.',
        implementation_date: '2025-08-10T10:00:00.000Z',
        cosmetics: [
          {
            id: 'p1',
            sku: 'COS-001',
            createBy: 'admin',
            name: 'Kem dưỡng ẩm ban ngày',
            description: 'Giúp cấp ẩm và bảo vệ da suốt 24h',
            inventory: 120,
            price: 250000,
            originPrice: 150000,
            category: 'Moisturizer',
            createdAt: dayjs().subtract(7, 'day').toISOString(),
            updatedAt: dayjs().toISOString(),
            images: [
              {
                fileName: 'kem_duong_am.jpg',
                id: 'img1',
                type: 'image/jpeg',
                originalUrl:
                  'https://dummyimage.com/600x400/89cff0/fff&text=Moisturizer',
                thumbnailUrl:
                  'https://dummyimage.com/200x200/89cff0/fff&text=Thumb',
                iconUrl: 'https://dummyimage.com/50x50/89cff0/fff&text=Icon',
              } as AttachmentEntity,
            ],
            _destroy: false,
            quantity: 3,
          },
        ],
        success: true,
        images: [
          {
            id: 'att_003_1',
            fileName: 'rf_before.jpg',
            type: 'image/jpeg',
            originalUrl: 'https://picsum.photos/id/1042/900/600',
            thumbnailUrl: 'https://picsum.photos/id/1042/180/120',
            iconUrl: 'https://picsum.photos/id/1042/48/48',
          },
          {
            id: 'att_003_2',
            fileName: 'rf_after.jpg',
            type: 'image/jpeg',
            originalUrl: 'https://picsum.photos/id/1043/900/600',
            thumbnailUrl: 'https://picsum.photos/id/1043/180/120',
            iconUrl: 'https://picsum.photos/id/1043/48/48',
          },
        ],
        createdAt: '2025-08-10T11:00:00.000Z',
        updateAt: '2025-08-10T11:05:00.000Z',
        nativeEventId: 'evt_RF88',
        total_treatment_fee: 200000,
        paid: 10000,
        debt: 40000,
      },
    ],
    images: [],
    leather_classification: 'Da thường',
    medical_history: 'Không có tiền sử đặc biệt.',
    pre_treatment: 'Chăm sóc cơ bản định kỳ.',
    other_info: 'Ưu tiên liệu trình không downtime.',
    skin_condition: 'Chảy xệ nhẹ vùng đường viền hàm.',
    diagnostic: 'Lão hoá mức độ nhẹ.',
    completed: true,
    createBy: 'therapist02',
    createdAt: '2025-08-05T06:20:00.000Z',
    payment_history: [],
    debt: 0,
    paid: 0,
  },
  {
    id: 'cus_004',
    type: 'MEMBER' as any,
    gender: 'MALE' as any,
    phoneNumber: '0977123456',
    profile: {
      name: 'Phạm Quốc Hùng',
      avatar: {
        id: 'att_004',
        fileName: 'avatar_hung.jpg',
        type: 'image/jpeg',
        originalUrl: 'https://picsum.photos/id/1010/600/600',
        thumbnailUrl: 'https://picsum.photos/id/1010/120/120',
        iconUrl: 'https://picsum.photos/id/1010/48/48',
      },
    },
    treatments: [
      {
        id: 'tr_005',
        title: 'Detox da',
        note: 'Theo dõi dầu nhờn sau 3 ngày.',
        implementation_date: '2025-09-09T13:30:00.000Z',
        cosmetics: [
          {
            id: 'p1',
            sku: 'COS-001',
            createBy: 'admin',
            name: 'Kem dưỡng ẩm ban ngày',
            description: 'Giúp cấp ẩm và bảo vệ da suốt 24h',
            inventory: 120,
            price: 250000,
            originPrice: 150000,
            category: 'Moisturizer',
            createdAt: dayjs().subtract(7, 'day').toISOString(),
            updatedAt: dayjs().toISOString(),
            images: [
              {
                fileName: 'kem_duong_am.jpg',
                id: 'img1',
                type: 'image/jpeg',
                originalUrl:
                  'https://dummyimage.com/600x400/89cff0/fff&text=Moisturizer',
                thumbnailUrl:
                  'https://dummyimage.com/200x200/89cff0/fff&text=Thumb',
                iconUrl: 'https://dummyimage.com/50x50/89cff0/fff&text=Icon',
              } as AttachmentEntity,
            ],
            _destroy: false,
            quantity: 3,
          },
        ],
        success: true,
        images: [],
        createdAt: '2025-09-09T14:00:00.000Z',
        updateAt: '2025-09-09T14:02:00.000Z',
        nativeEventId: 'evt_DT11',
        total_treatment_fee: 200000,
        paid: 10000,
        debt: 40000,
      },
    ],
    images: [
      {
        id: 'att_004_g1',
        fileName: 'gallery_4.jpg',
        type: 'image/jpeg',
        originalUrl: 'https://picsum.photos/id/106/1000/750',
        thumbnailUrl: 'https://picsum.photos/id/106/200/150',
        iconUrl: 'https://picsum.photos/id/106/48/48',
      },
    ],
    leather_classification: 'Da dầu mụn',
    medical_history: 'Nhạy cảm với aspirin.',
    pre_treatment: 'Dùng tẩy tế bào chết hoá học 1 lần/tuần.',
    other_info: 'Tập gym 5 buổi/tuần.',
    skin_condition: 'Bít tắc lỗ chân lông vùng chữ T.',
    diagnostic: 'Dày sừng nang lông + bít tắc.',
    completed: false,
    createBy: 'admin',
    createdAt: '2025-09-01T01:00:00.000Z',
    payment_history: [],
    debt: 0,
    paid: 0,
  },
  {
    id: 'cus_005',
    type: 'LEAD' as any,
    gender: 'FEMALE' as any,
    phoneNumber: '0966123123',
    profile: {
      name: 'Hoàng Khánh Vy',
      avatar: {
        id: 'att_005',
        fileName: 'avatar_vy.jpg',
        type: 'image/jpeg',
        originalUrl: 'https://picsum.photos/id/1004/600/600',
        thumbnailUrl: 'https://picsum.photos/id/1004/120/120',
        iconUrl: 'https://picsum.photos/id/1004/48/48',
      },
    },
    treatments: [],
    images: [],
    leather_classification: 'Da khô',
    medical_history: 'Viêm mũi dị ứng theo mùa.',
    pre_treatment: 'Không có.',
    other_info: 'Làm văn phòng, phòng máy lạnh.',
    skin_condition: 'Khô bong nhẹ 2 bên má.',
    diagnostic: 'Thiếu ẩm + hàng rào bảo vệ suy yếu.',
    completed: false,
    createBy: 'reception',
    createdAt: '2025-09-10T03:45:00.000Z',
    payment_history: [],
    debt: 0,
    paid: 0,
  },
  {
    id: 'cus_006',
    type: 'VIP' as any,
    gender: 'OTHER' as any,
    phoneNumber: '0933001122',
    profile: {
      name: 'Phan Gia Tú',
      avatar: {
        id: 'att_006',
        fileName: 'avatar_tu.jpg',
        type: 'image/jpeg',
        originalUrl: 'https://picsum.photos/id/1015/600/600',
        thumbnailUrl: 'https://picsum.photos/id/1015/120/120',
        iconUrl: 'https://picsum.photos/id/1015/48/48',
      },
    },
    treatments: [
      {
        id: 'tr_006',
        title: 'Mesotherapy HA',
        note: 'Tránh makeup 24h.',
        implementation_date: '2025-08-30T09:00:00.000Z',
        cosmetics: [
          {
            id: 'p1',
            sku: 'COS-001',
            createBy: 'admin',
            name: 'Kem dưỡng ẩm ban ngày',
            description: 'Giúp cấp ẩm và bảo vệ da suốt 24h',
            inventory: 120,
            price: 250000,
            originPrice: 150000,
            category: 'Moisturizer',
            createdAt: dayjs().subtract(7, 'day').toISOString(),
            updatedAt: dayjs().toISOString(),
            images: [
              {
                fileName: 'kem_duong_am.jpg',
                id: 'img1',
                type: 'image/jpeg',
                originalUrl:
                  'https://dummyimage.com/600x400/89cff0/fff&text=Moisturizer',
                thumbnailUrl:
                  'https://dummyimage.com/200x200/89cff0/fff&text=Thumb',
                iconUrl: 'https://dummyimage.com/50x50/89cff0/fff&text=Icon',
              } as AttachmentEntity,
            ],
            _destroy: false,
            quantity: 3,
          },
        ],
        success: true,
        images: [
          {
            id: 'att_006_1',
            fileName: 'meso_before.jpg',
            type: 'image/jpeg',
            originalUrl: 'https://picsum.photos/id/1050/900/600',
            thumbnailUrl: 'https://picsum.photos/id/1050/180/120',
            iconUrl: 'https://picsum.photos/id/1050/48/48',
          },
        ],
        createdAt: '2025-08-30T10:00:00.000Z',
        updateAt: '2025-08-30T10:03:00.000Z',
        nativeEventId: 'evt_MS77',
        total_treatment_fee: 200000,
        paid: 10000,
        debt: 40000,
      },
    ],
    images: [],
    leather_classification: 'Da thường',
    medical_history: 'Không.',
    pre_treatment: 'Dưỡng ẩm cơ bản.',
    other_info: 'Uống nước < 1.5L/ngày.',
    skin_condition: 'Mất nước bề mặt.',
    diagnostic: 'Thiếu ẩm cấp tính.',
    completed: true,
    createBy: 'therapist01',
    createdAt: '2025-08-29T05:30:00.000Z',
    payment_history: [],
    debt: 0,
    paid: 0,
  },
];
