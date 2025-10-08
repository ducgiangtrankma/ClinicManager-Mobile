import { store } from '@src/redux';
import axiosClient from './axiosClient';
import { AttachmentEntity, LocalFileEntity } from '@src/models';
const attachmentUrl = '/attachment';
export const AttachmentService = {
  upload: async (files: LocalFileEntity[] | Blob[]) => {
    const formData = new FormData();

    files.forEach(file => {
      formData.append('files', file);
    });
    return axiosClient.post<{
      success: AttachmentEntity[];
    }>(`${attachmentUrl}/upload`, formData, {
      headers: {
        Authorization: 'Bearer ' + store.getState().appReducer.accessToken,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
