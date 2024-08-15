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
    overwriteAccount(state, action) {
      const { id, ...newData } = action.payload;
      const index = state.accounts.findIndex((account) => account.id === id);
      if (index !== -1) {
        state.accounts[index] = { id, ...newData };
      }
    },
    deleteAccount(state, action) {},
  },
});

export const accountActions = accountSlice.actions;
