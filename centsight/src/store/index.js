import { configureStore, createSlice } from '@reduxjs/toolkit';

const categoryState = { categories: {}, subcategories: {} };
const transactionState = { transactions: {} };

const categorySlice = createSlice({
  name: 'categories',
  initialState: categoryState,
  reducers: {},
});
const transactionSlice = createSlice({
  name: 'transactions',
  initialState: transactionState,
  reducers: {},
});

const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    transaction: transactionSlice.reducer,
  },
});

export const categoryActions = categorySlice.actions;
export const transactionActions = transactionSlice.actions;

export default store;
