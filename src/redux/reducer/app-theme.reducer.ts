import { createSlice } from '@reduxjs/toolkit';
import { AppThemeEntity, AppThemeState } from '@src/models';

const initialLanguageState: AppThemeState = {
  appTheme: AppThemeEntity.dark,
};

const slice = createSlice({
  name: 'APP_THEME_STATE',
  initialState: initialLanguageState,
  reducers: {
    onChangeAppTheme: state => {
      if (state.appTheme === AppThemeEntity.dark) {
        state.appTheme = AppThemeEntity.light;
      } else {
        state.appTheme = AppThemeEntity.dark;
      }
    },
  },
});
const appThemeReducer = slice.reducer;
export default appThemeReducer;
export const { onChangeAppTheme } = slice.actions;
