import { configureStore } from '@reduxjs/toolkit';
import { categorySlice } from './category-slice';
import { transactionSlice } from './transaction-slice';

export const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    transaction: transactionSlice.reducer,
  },
});
