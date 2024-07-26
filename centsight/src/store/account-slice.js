import { createSlice } from '@reduxjs/toolkit';

const accountState = { accounts: [] };

const accountSlice = createSlice({
  name: 'accounts',
  initialState: accountState,
  reducers: {
    replaceAccounts(state, action) {
      state.accounts = action.payload;
    },
    addAccount(state, action) {
      state.accounts.push(action.payload);
    },
    deleteAccount(state, action) {},
  },
});

export const accountActions = accountSlice.actions;
