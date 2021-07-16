import { configureStore } from '@reduxjs/toolkit';

import tokenReducer from './tokenSlice';
import customerInfoReducer from './customerInfoSlice';
import notificationsReducer from './notificationsSlice';

export default configureStore({
  reducer: {
    token: tokenReducer,
    customerInfo: customerInfoReducer,
    notifications: notificationsReducer,
  },
});
