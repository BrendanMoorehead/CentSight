import { createSlice } from '@reduxjs/toolkit';

const accountState = { accounts: [] };

export const accountSlice = createSlice({
  name: 'accounts',
  initialState: accountState,
  reducers: {
    replaceAccounts(state, action) {
      state.accounts = action.payload;
    },
    clearAccounts(state) {
      state.accounts = null;
    },
    addAccount(state, action) {
      state.accounts.push(action.payload);
    },
    deleteAccount(state, action) {},
  },
});

export const accountActions = accountSlice.actions;
