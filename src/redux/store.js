import { configureStore } from '@reduxjs/toolkit';
import jwtTokenReducer from './jwtTokenSlice';

export default configureStore({
    reducer: {
        jwtToken: jwtTokenReducer,
    },
});