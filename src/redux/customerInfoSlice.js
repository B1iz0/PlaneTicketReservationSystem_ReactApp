import { createSlice } from '@reduxjs/toolkit';

export const customerInfoSlice = createSlice({
  name: 'customerInfo',
  initialState: {
    firstName: {
      value: '',
      isValid: true,
    },
    lastName: {
      value: '',
      isValid: true,
    },
    email: {
      value: '',
      isValid: true,
    },
    phone: ''
  },
  reducers: {
    setFirstName: (state, action) => {
      state.firstName.value = action.payload;
    },
    setFirstNameValid: (state, action) => {
      state.firstName.isValid = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName.value = action.payload;
    },
    setLastNameValid: (state, action) => {
      state.lastName.isValid = action.payload;
    },
    setEmail: (state, action) => {
      state.email.value = action.payload;
    },
    setEmailValid: (state, action) => {
      state.email.isValid = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
  },
});

export const {
  setFirstName,
  setFirstNameValid,
  setLastName,
  setLastNameValid,
  setEmail,
  setEmailValid,
  setPhone,
} = customerInfoSlice.actions;

export default customerInfoSlice.reducer;