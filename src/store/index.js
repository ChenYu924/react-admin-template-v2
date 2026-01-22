import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/user';
import systemReducer from './modules/system';

const store = configureStore({
  reducer: {
    user: userReducer,
    system: systemReducer,
  },
});

export default store;
