import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SystemSettingEntity, SystemSettingState } from '@src/models';

const initialSystemConfig: SystemSettingState = {
  iosNewVersion: null,
  androidNewVersion: null,
  enableAds: null,
  enableIAP: null,
  systemMaintenance: null,
  createdAt: null,
  updatedAt: null,
  id: null,
  appInReview: false,
};

const slice = createSlice({
  name: 'SYSTEM_STATE',
  initialState: initialSystemConfig,
  reducers: {
    onSetSystemConfig: (
      state,
      { payload }: PayloadAction<SystemSettingEntity>,
    ) => {
      return payload;
    },
  },
});
const systemSettingReducer = slice.reducer;
export default systemSettingReducer;
export const { onSetSystemConfig } = slice.actions;
