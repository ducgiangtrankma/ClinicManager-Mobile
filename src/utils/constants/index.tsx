import { CUSTOMER_TYPE, Gender } from '@src/models';
import { sizes } from '../sizes';
import { enumToOptions } from '../helper';

export const ACTIVE_OPACITY_TOUCH = 0.6;
export const MAX_COUNT_IMAGE_UPLOAD = 6;
export const DEFAULT_HIT_SLOP = {
  top: sizes._12sdp,
  bottom: sizes._12sdp,
  left: sizes._12sdp,
  right: sizes._12sdp,
};

export enum CHANGE_COUNT_TYPE {
  DECREASE = 'DECREASE',
  INCREASE = 'INCREASE',
}
export const BLANK_AVATAR =
  'https://banner2.cleanpng.com/20240229/agb/transparent-pokemon-sad-pikachu-with-red-nose-black-1710858214400.webp';
// export const LEATHER_CLASSIFICATION_DATA = [
//   {
//     id: '1',
//     label: 'Thường',
//     value: 'Thường',
//   },
//   {
//     id: '2',
//     label: 'Khô',
//     value: 'Khô',
//   },
//   {
//     id: '3',
//     label: 'Dầu',
//     value: 'Dầu',
//   },
//   {
//     id: '4',
//     label: 'Hỗ hợp thiên khô',
//     value: 'Hỗ hợp thiên khô',
//   },
//   {
//     id: '5',
//     label: 'Hỗn hợp thiên dầu',
//     value: 'Hỗn hợp thiên dầu',
//   },
// ];

// export const MATERNITY = [
//   {
//     id: '1',
//     label: 'Đang dự định mang thai',
//     value: 'Đang dự định mang thai',
//   },
//   {
//     id: '2',
//     label: 'Đang mang thai',
//     value: 'Đang mang thai',
//   },
//   {
//     id: '3',
//     label: 'Đang cho con bú',
//     value: 'Đang cho con bú',
//   },
//   {
//     id: '4',
//     label: 'Không có',
//     value: 'không có',
//   },
// ];
export const CUSTOMER_TYPE_DATA = [
  {
    id: '1',
    label: 'Khách lẻ',
    value: CUSTOMER_TYPE.retail,
  },
  {
    id: '2',
    label: 'Khách liệu trình',
    value: CUSTOMER_TYPE.treatment,
  },
];

export enum LeatherClassification {
  Empty = 'Chưa có thông tin',
  Normal = 'Thường',
  Dry = 'Khô',
  Oily = 'Dầu',
  Combination_Dry = 'Hỗn hợp thiên khô',
  Combination_Oily = 'Hỗn hợp thiên dầu',
}
export enum Maternity {
  Empty = 'Chưa có thông tin',
  Upcoming = 'Đang dự định mang thai',
  Pregnant = 'Đang mang thai',
  Breastfeeding = 'Đang cho con bú',
  Normal = 'Không có',
}
export const LEATHER_CLASSIFICATION_DATA = enumToOptions(LeatherClassification);
export const MATERNITY_DATA = enumToOptions(Maternity);
export const GENDER_DATA = enumToOptions(Gender);
