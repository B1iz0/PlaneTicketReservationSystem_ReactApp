import { createSlice } from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    isBookingCreationActive: false,
    isCompanyCreationActive: false,
  },
  reducers: {
    setIsBookingCreationActive: (state, action) => {
      state.isBookingCreationActive = action.payload;
    },
    setIsCompanyCreationActive: (state, action) => {
      state.isCompanyCreationActive = action.payload;
    },
  },
});

export const {
  setIsBookingCreationActive,
  setIsCompanyCreationActive
} = notificationsSlice.actions;

export default notificationsSlice.reducer;