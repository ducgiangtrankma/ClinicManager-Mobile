import {
  AttachmentEntity,
  GridImageEntity,
  LocalFileEntity,
} from '@src/models';
import { TreatmentEntity } from '@src/models/TreatmentEntity';
import { Linking, Platform } from 'react-native';

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
export { callNumber, isSuccessTreatment };
