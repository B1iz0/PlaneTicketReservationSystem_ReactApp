import { createSlice } from '@reduxjs/toolkit';

export const refreshTokenSlice = createSlice({
    name: 'refreshToken',
    initialState: {
      value: localStorage.getItem('refreshToken'),
    },
    reducers: {
      setRefreshToken: (state, action) => {
        state.value = action.payload;
      },
      removeRefreshToken: (state) => {
        state.value = '';
      },
    },
  })
  
  export const { setRefreshToken, removeRefreshToken } = refreshTokenSlice.actions
  
  export default refreshTokenSlice.reducer