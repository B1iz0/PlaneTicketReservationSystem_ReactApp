import { createSlice } from '@reduxjs/toolkit';

export const jwtTokenSlice = createSlice({
    name: 'jwtToken',
    initialState: {
      value: localStorage.getItem('jwtToken'),
    },
    reducers: {
      setJwtToken: (state, action) => {
        state.value = action.payload;
      },
      removeJwtToken: (state) => {
        state.value = '';
      },
    },
  })
  
  export const { setJwtToken, removeJwtToken } = jwtTokenSlice.actions
  
  export default jwtTokenSlice.reducer