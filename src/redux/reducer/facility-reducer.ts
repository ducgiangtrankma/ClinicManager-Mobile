import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FacilityEntity, FacilityState } from '@src/models';

const initialLanguageState: FacilityState = {
  facility: undefined,
};

const slice = createSlice({
  name: 'FACILITY_STATE',
  initialState: initialLanguageState,
  reducers: {
    onSelectFacility: (state, { payload }: PayloadAction<FacilityEntity>) => {
      state.facility = payload;
    },
  },
});
const facilityReducer = slice.reducer;
export default facilityReducer;
export const { onSelectFacility } = slice.actions;
