import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStateEntity, ScheduleType, UserEntity } from '@src/models';

const initialAppState: AppStateEntity = {
  accessToken: 'undefined',
  refreshToken: undefined,
  user: undefined,
  showOnboarding: true,
  scheduleType: ScheduleType.MONTH_CALENDAR,
};

const slice = createSlice({
  name: 'APP_STATE',
  initialState: initialAppState,
  reducers: {
    onSetToken: (
      state,
      {
        payload,
      }: PayloadAction<{
        accessToken: string;
        refreshToken?: string;
      }>,
    ) => {
      state.accessToken = payload.accessToken;
      if (payload.refreshToken) {
        state.refreshToken = payload.refreshToken;
      }
    },
    onSetUser: (
      state,
      {
        payload,
      }: PayloadAction<{
        user: UserEntity;
      }>,
    ) => {
      state.user = payload.user;
    },
    onDisableOnboarding: state => {
      state.showOnboarding = false;
    },
    onChangeScheduleType: (
      state,
      {
        payload,
      }: PayloadAction<{
        type: ScheduleType;
      }>,
    ) => {
      state.scheduleType = payload.type;
    },
    onLogout: state => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
  },
});
const appReducer = slice.reducer;
export default appReducer;
export const {
  onSetToken,
  onSetUser,
  onLogout,
  onDisableOnboarding,
  onChangeScheduleType,
} = slice.actions;
