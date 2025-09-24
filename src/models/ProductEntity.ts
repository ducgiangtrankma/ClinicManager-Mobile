import { AttachmentEntity } from './AttachmentEntity';
import dayjs from 'dayjs';

export interface ProductEntity {
  id: string;
  sku: string;
  createBy: string;
  name: string;
  description: string;
  inventory: number;
  price: number; //Giá bán
  originPrice: number; //Giá gốc
  category: string;
  createdAt: string;
  updatedAt: string | null;
  images: AttachmentEntity[];
  _destroy: boolean;
}

export interface ProductSelected extends ProductEntity {
  quantity: number;
}
export const cosmeticsDummy: ProductEntity[] = [
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
        thumbnailUrl: 'https://dummyimage.com/200x200/89cff0/fff&text=Thumb',
        iconUrl: 'https://dummyimage.com/50x50/89cff0/fff&text=Icon',
      } as AttachmentEntity,
    ],
    _destroy: false,
  },
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
        originalUrl: 'https://dummyimage.com/600x400/f9a602/fff&text=Serum+C',
        thumbnailUrl: 'https://dummyimage.com/200x200/f9a602/fff&text=Thumb',
        iconUrl: 'https://dummyimage.com/50x50/f9a602/fff&text=Icon',
      },
    ],
    _destroy: false,
  },
  {
    id: 'p3',
    sku: 'COS-003',
    createBy: 'staff02',
    name: 'Kem chống nắng SPF50',
    description: 'Bảo vệ da tối ưu, không gây nhờn rít',
    inventory: 150,
    price: 280000,
    originPrice: 150000,
    category: 'Sunscreen',
    createdAt: dayjs().subtract(1, 'day').toISOString(),
    updatedAt: null,
    images: [
      {
        fileName: 'kem_chong_nang.jpg',
        id: 'img3',
        type: 'image/jpeg',
        originalUrl: 'https://dummyimage.com/600x400/ffa1a1/fff&text=Sunscreen',
        thumbnailUrl: 'https://dummyimage.com/200x200/ffa1a1/fff&text=Thumb',
        iconUrl: 'https://dummyimage.com/50x50/ffa1a1/fff&text=Icon',
      },
    ],
    _destroy: false,
  },
];
