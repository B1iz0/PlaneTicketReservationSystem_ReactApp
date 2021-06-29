import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    jwtToken: localStorage.getItem('jwtToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  },
  reducers: {
    getJwtToken: (state) => {
      return state.jwtToken;
    },
    setJwtToken: (state, action) => {
      state.jwtToken = action.payload;
    },
    removeJwtToken: (state) => {
      state.jwtToken = '';
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    removeRefreshToken: (state) => {
      state.refreshToken = '';
    },
  },
});

export const {
  getJwtToken,
  setJwtToken,
  removeJwtToken,
  setRefreshToken,
  removeRefreshToken,
} = tokenSlice.actions;

export default tokenSlice.reducer;
