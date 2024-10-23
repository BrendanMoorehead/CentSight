import { createSlice } from '@reduxjs/toolkit';

const transactionState = { transactions: [], loading: false, error: null };

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState: transactionState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    replaceTransactions(state, action) {
      state.transactions = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearTransactions(state) {
      state.transactions = null;
      state.loading = false;
      state.error = null;
    },
    addTransaction(state, action) {
      state.transactions.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteTransaction(state, action) {
      state.transactions = state.transactions.filter(
        (trans) => trans.id !== action.payload.id
      );
    },
  },
});

export const transactionActions = transactionSlice.actions;
