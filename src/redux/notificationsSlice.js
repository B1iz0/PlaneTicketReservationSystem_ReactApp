import { createSlice } from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    simpleSuccessNotificationText: '',
    isSimpleSuccessNotificationActive: false,
    isBookingCreationActive: false,
    isCompanyCreationActive: false,
  },
  reducers: {
    setSimpleSuccessNotificationText: (state, action) => {
      state.simpleSuccessNotificationText = action.payload;
    },
    setIsSimpleSuccessNotificationActive: (state, action) => {
      state.isSimpleSuccessNotificationActive = action.payload;
    },
    setIsBookingCreationActive: (state, action) => {
      state.isBookingCreationActive = action.payload;
    },
    setIsCompanyCreationActive: (state, action) => {
      state.isCompanyCreationActive = action.payload;
    },
  },
});

export const {
  setSimpleSuccessNotificationText,
  setIsSimpleSuccessNotificationActive,
  setIsBookingCreationActive,
  setIsCompanyCreationActive,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
