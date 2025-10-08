import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { showErrorMessage } from '@src/components';

import { AttachmentEntity, CreateCustomerBodyData } from '@src/models';
import { goBack } from '@src/navigator';
import { AttachmentService, CustomerService } from '@src/services';
import TranslationKeys from '@src/utils/translations/i18n-type';

interface CreateCustomerProgressState {
  isVisible: boolean;
  progress: number;
  message: TranslationKeys;
}

const initialState: CreateCustomerProgressState = {
  isVisible: false,
  progress: 0,
  message: 'customer_progress_default_title',
};

// Thunk để handle việc đăng bài viết
export const submitCustomer = createAsyncThunk(
  'createCustomerProgress/submitCustomer',
  async (customerData: CreateCustomerBodyData, { dispatch }) => {
    try {
      console.log('submitCustomer', customerData);
      // Hiển thị progress
      dispatch(
        showProgress({
          message: 'customer_progress_preparing_data',
          progress: 10,
        }),
      );

      let imageIds: string[] = [];

      // Upload images nếu có
      if (customerData.images && customerData.images.length > 0) {
        dispatch(
          updateProgress({
            message: 'customer_progress_upload_image',
            progress: 30,
          }),
        );

        try {
          const uploadResponse = await AttachmentService.upload(
            customerData.images,
          );

          // Giả sử response trả về array of attachments với id
          if (uploadResponse.data && uploadResponse.data.success) {
            imageIds = uploadResponse.data.success.map(
              (attachment: AttachmentEntity) => attachment.id,
            );
          }

          dispatch(
            updateProgress({
              message: 'customer_progress_upload_image_success',
              progress: 60,
            }),
          );
        } catch (uploadError) {
          console.error('Error uploading images:', uploadError);
          dispatch(
            updateProgress({
              message: 'customer_progress_upload_image_error',
              progress: 60,
            }),
          );
          // Tiếp tục với imageIds rỗng nếu upload fail
        }
      } else {
        dispatch(
          updateProgress({
            message: 'customer_progress_upload_image_skip',
            progress: 60,
          }),
        );
      }

      // Tạo tracking với imageIds
      dispatch(
        updateProgress({ message: 'customer_progress_saving', progress: 80 }),
      );

      const createCustomerPayload = {
        ...customerData,
        images: imageIds, // Array of string IDs
      };

      const customerResponse = await CustomerService.createCustomer(
        createCustomerPayload,
      );

      dispatch(
        updateProgress({
          message: 'customer_progress_create_success',
          progress: 100,
        }),
      );

      // Hide progress after a short delay
      setTimeout(() => {
        dispatch(hideProgress());
        // Dispatch action để notify screens khác refresh
        dispatch({
          type: 'customer/createSuccess',
          payload: customerResponse.data,
        });
        goBack();
      }, 500);

      return {
        success: true,
        data: customerResponse.data,
        uploadedImageIds: imageIds,
      };
    } catch (error: any) {
      showErrorMessage('error.title', error.message);
      dispatch(hideProgress());
      throw error;
    }
  },
);

const createCustomerProgressSlice = createSlice({
  name: 'createCustomerProgress',
  initialState,
  reducers: {
    showProgress: (
      state,
      action: PayloadAction<{ message: TranslationKeys; progress?: number }>,
    ) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.progress = action.payload.progress || 0;
    },
    hideProgress: state => {
      state.isVisible = false;
      state.progress = 0;
    },
    updateProgress: (
      state,
      action: PayloadAction<{ message?: TranslationKeys; progress?: number }>,
    ) => {
      if (action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload.progress !== undefined) {
        state.progress = action.payload.progress;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(submitCustomer.pending, state => {
        state.isVisible = true;
        state.progress = 0;
        state.message = 'customer_progress_start';
      })
      .addCase(submitCustomer.fulfilled, state => {
        state.progress = 100;
        state.message = 'customer_progress_end';
      })
      .addCase(submitCustomer.rejected, state => {
        state.isVisible = false;
        state.progress = 0;
      });
  },
});

export const { showProgress, hideProgress, updateProgress } =
  createCustomerProgressSlice.actions;
export default createCustomerProgressSlice.reducer;
