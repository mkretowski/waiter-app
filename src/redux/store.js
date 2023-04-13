import tablesReducer from './tablesReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    tables: tablesReducer,
  },
});

export default store;
