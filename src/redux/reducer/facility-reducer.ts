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
    onClearFacility: state => {
      state.facility = undefined;
    },
  },
});
const facilityReducer = slice.reducer;
export default facilityReducer;
export const { onSelectFacility, onClearFacility } = slice.actions;
