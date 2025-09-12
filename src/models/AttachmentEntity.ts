export interface AttachmentEntity {
  fileName: string;
  id: string;
  type: string;
  originalUrl: string;
  thumbnailUrl: string;
  iconUrl: string;
}

export interface LocalFileEntity {
  fileName: string;
  fileSize: number;
  height: number;
  name: string;
  size: number;
  type: string;
  uri: string;
  width: number;
}

export interface GridImageEntity {
  fileName: string;
  id: string;
  type: string;
  originalUrl: string;
  thumbnailUrl: string;
  iconUrl: string;
}
