import { createSlice } from '@reduxjs/toolkit';
const transactionState = { transactions: {} };

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState: transactionState,
  reducers: {},
});

export const transactionActions = transactionSlice.actions;
