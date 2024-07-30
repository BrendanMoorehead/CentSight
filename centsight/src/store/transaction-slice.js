import { createSlice } from '@reduxjs/toolkit';

const transactionState = { transactions: {} };

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState: transactionState,
  reducers: {
    replaceTransactions(state, action) {
      state.transactions = action.payload;
    },
    clearTransactions(state) {
      state.transactions = null;
    },
    addTransaction(state, action) {
      state.transactions.push(action.payload);
    },
    deleteTransaction(state, action) {
      state.transactions = state.transactions.filter(
        (trans) => trans.id !== action.payload.id
      );
    },
  },
});

export const transactionActions = transactionSlice.actions;
