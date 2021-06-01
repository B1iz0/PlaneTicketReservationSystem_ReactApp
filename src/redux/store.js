import { configureStore } from '@reduxjs/toolkit';
import jwtTokenReducer from './jwtTokenSlice';
import refreshTokenReducer from './refreshTokenSlice';

export default configureStore({
    reducer: {
        jwtToken: jwtTokenReducer,
        refreshToken: refreshTokenReducer,
    },
});