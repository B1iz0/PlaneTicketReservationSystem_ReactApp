import { createSlice } from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    isBookingCreationActive: false,
  },
  reducers: {
    setIsBookingCreationActive: (state, action) => {
      state.isBookingCreationActive = action.payload;
    },
  },
});

export const {
  setIsBookingCreationActive,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;