import { AttachmentEntity } from './AttachmentEntity';

export interface UserEntity {
  id: string;
  email: string;
  birthDay: string;
  gender: string;
  avatar: AttachmentEntity;
  isVerified: boolean;
  deviceTokens: string[];
  publicKeyBiometrics: any;
  createdAt: string;
  updatedAt: string;
}
