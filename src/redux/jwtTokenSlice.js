import { createSlice } from '@reduxjs/toolkit';

export const jwtTokenSlice = createSlice({
    name: 'jwtToken',
    initialState: {
      value: '',
    },
    reducers: {
      setJwtToken: (state, action) => {
        state.value = action.payload;
      },
    },
  })
  
  export const { setJwtToken } = jwtTokenSlice.actions
  
  export default jwtTokenSlice.reducer