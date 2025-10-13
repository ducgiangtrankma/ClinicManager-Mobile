import {
  AppLanguage,
  AttachmentEntity,
  Gender,
  GridImageEntity,
  LocalFileEntity,
  ProductSelected,
  ScheduleEntity,
} from '@src/models';
import { TreatmentEntity } from '@src/models/TreatmentEntity';
import { Linking, PermissionsAndroid, Platform } from 'react-native';
import dayjs from 'dayjs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import {
  DayEvents,
  EventType,
} from '@src/components/ScheduleCalendarBase/MonthCalendar';
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

export const formatDateTime = (
  date: string | Date,
  format: 'dd/mm/yyyy' | 'dd/mm/yyyy HH:mm' = 'dd/mm/yyyy',
): string => {
  const d = dayjs(date);
  switch (format) {
    case 'dd/mm/yyyy':
      return d.format('DD/MM/YYYY');
    case 'dd/mm/yyyy HH:mm':
      return d.format('DD/MM/YYYY - HH:mm');
    default:
      return d.format(); // fallback ISO
  }
};

export const formatMoney = (money: number | string) => {
  return money && money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const hasAndroidPermission = async () => {
  const getCheckPermissionPromise = () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      return Promise.all([
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ),
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      );
    } else {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  };

  const hasPermission = await getCheckPermissionPromise();

  if (hasPermission) {
    return true;
  }

  const getRequestPermissionPromise = () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        statuses =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getRequestPermissionPromise();
};

export const SaveToCameraRoll = async (uri: string) => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) return;

  await CameraRoll.saveAsset(uri, {
    type: 'photo',
  });
};

export type OptionItem = { id: string; label: string; value: string };

export function enumToOptions<T extends Record<string, string>>(
  en: T,
  opts?: {
    start?: number; // id bắt đầu (mặc định 1)
    order?: string[]; // ưu tiên các key lên đầu (mặc định ['Empty'])
    label?: (value: string, key: string, index: number) => string;
    value?: (value: string, key: string, index: number) => string;
    filter?: (key: string, value: string) => boolean; // lọc nếu muốn
  },
): OptionItem[] {
  const {
    start = 1,
    order = ['Empty'],
    label = (v: any) => v,
    value = (v: any) => v,
    filter = () => true,
  } = opts ?? {};

  const entries = Object.entries(en).filter(([k, v]) => filter(k, v));

  // Đưa các key trong `order` lên đầu theo đúng thứ tự order
  const ordered = [
    ...(order
      .map(want => entries.find(([k]) => k === want))
      .filter(Boolean) as [string, string][]),
    ...entries.filter(([k]) => !order.includes(k)),
  ];

  return ordered.map(([k, v], i) => ({
    id: String(start + i),
    label: label(v, k, i),
    value: value(v, k, i),
  }));
}
export const renderGender = (gender: Gender) => {
  if (gender === Gender.Female) return 'Nữ';
  if (gender === Gender.Male) return 'Nam';
  if (gender === Gender.Other) return 'Khác';
};

export const startsWithHttp = (s: unknown): boolean => {
  return typeof s === 'string' && /^\s*https?:\/\//i.test(s);
};

export const calcTotalPrice = (products: ProductSelected[]): number => {
  if (!products?.length) return 0;
  return products.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export function convertToDayEvents(items: ScheduleEntity[]): DayEvents {
  const result: DayEvents = {};

  for (const item of items) {
    // Parse ngày/giờ từ implementationDate
    const d = new Date(item.implementationDate);
    // Lấy theo múi giờ máy (24h). Nếu bạn muốn UTC, đổi sang d.getUTCHours()/getUTCMinutes()
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const dateKey = `${yyyy}-${mm}-${dd}`;

    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    const time = `${hh}:${mi}`;

    // Title fallback: treatment.title -> note -> 'Điều trị'
    const title =
      item?.treatment?.title?.trim() || (item?.note ?? '').trim() || 'Điều trị';

    const event = {
      id: String(item.id),
      title,
      type: EventType.TREATMENT, // mặc định theo yêu cầu
      time,
    };

    if (!result[dateKey]) result[dateKey] = [];
    result[dateKey].push(event);
  }

  // Sắp xếp các event trong cùng ngày theo time tăng dần (tuỳ chọn)
  for (const key of Object.keys(result)) {
    result[key].sort((a, b) =>
      (a.time ?? '00:00').localeCompare(b.time ?? '00:00'),
    );
  }

  return result;
}
export { callNumber, isSuccessTreatment };
