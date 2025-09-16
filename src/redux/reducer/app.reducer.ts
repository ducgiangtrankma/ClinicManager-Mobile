import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStateEntity, UserEntity } from '@src/models';

const initialAppState: AppStateEntity = {
  accessToken: undefined,
  refreshToken: undefined,
  user: undefined,
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

    onLogout: state => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
  },
});
const appReducer = slice.reducer;
export default appReducer;
export const { onSetToken, onSetUser, onLogout } = slice.actions;
