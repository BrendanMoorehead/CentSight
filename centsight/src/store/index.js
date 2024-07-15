import { configureStore } from '@reduxjs/toolkit';
import { categorySlice } from './category-slice';
import { transactionSlice } from './transaction-slice';
import { authSlice } from './auth-slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    transaction: transactionSlice.reducer,
  },
});
