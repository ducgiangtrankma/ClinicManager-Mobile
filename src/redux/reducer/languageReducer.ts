import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppLanguage, LanguageState } from '@src/models';

const initialLanguageState: LanguageState = {
  appLanguage: AppLanguage.vi,
};

const slice = createSlice({
  name: 'LANGUAGE_STATE',
  initialState: initialLanguageState,
  reducers: {
    onChangeLanguage: (state, { payload }: PayloadAction<AppLanguage>) => {
      state.appLanguage = payload;
    },
  },
});
const languageReducer = slice.reducer;
export default languageReducer;
export const { onChangeLanguage } = slice.actions;
