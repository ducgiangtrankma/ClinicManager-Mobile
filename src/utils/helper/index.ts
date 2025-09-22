import {
  AppLanguage,
  AttachmentEntity,
  GridImageEntity,
  LocalFileEntity,
} from '@src/models';
import { TreatmentEntity } from '@src/models/TreatmentEntity';
import { Linking, Platform } from 'react-native';
import dayjs from 'dayjs';

function callNumber(phone: string) {
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  return Linking.openURL(phoneNumber);
}
const isSuccessTreatment = (treatments: TreatmentEntity[]) => {
  if (treatments.length === 0) {
    return false;
  }
  return treatments.find(item => item.success === false) ? false : true;
};
export function attachmentsToGridImages(
  attachments: AttachmentEntity[],
): GridImageEntity[] {
  return attachments.map(a => a);
}
export function localFilesToGridImages(
  localFiles: LocalFileEntity[],
): GridImageEntity[] {
  return localFiles.map(f => ({
    id: f.fileName,
    originalUrl: f.uri,
    thumbnailUrl: f.uri,
    fileName: f.fileName,
    type: f.type,
    iconUrl: f.uri,
  }));
}
export const getInfoFromTime = (time: string) => {
  const dateObj = new Date(time);

  const day = String(dateObj.getUTCDate()).padStart(2, '0');
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
  const year = dateObj.getUTCFullYear();

  return { day, month, year };
};
export const getDayOfWeek = (time: string, language: AppLanguage) => {
  const dateObj = new Date(time);

  const daysEn = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const daysVi = [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ];

  const dayIndex = dateObj.getUTCDay();

  return language === AppLanguage.vi ? daysVi[dayIndex] : daysEn[dayIndex];
};
export const getMonthLabel = (time: string, language: AppLanguage) => {
  const d = dayjs(time);
  return language === AppLanguage.vi
    ? `T${d.month() + 1}`
    : d.format('MMM').toUpperCase();
};

export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) {
    return 'vài giây trước';
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} phút trước`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} giờ trước`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} ngày trước`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} tháng trước`;
  }

  const years = Math.floor(months / 12);
  return `${years} năm trước`;
};
export { callNumber, isSuccessTreatment };
