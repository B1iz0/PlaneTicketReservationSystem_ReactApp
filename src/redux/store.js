import { configureStore } from '@reduxjs/toolkit';

import tokenReducer from './tokenSlice';
import customerInfoReducer from './customerInfoSlice';

export default configureStore({
  reducer: {
    token: tokenReducer,
    customerInfo: customerInfoReducer,
  },
});
