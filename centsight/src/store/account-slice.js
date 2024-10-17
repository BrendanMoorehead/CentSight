import { createSlice } from '@reduxjs/toolkit';

const accountState = { accounts: [], loading: false, error: null, lastFetched: null };

export const accountSlice = createSlice({
  name: 'accounts',
  initialState: accountState,
  reducers: {
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    replaceAccounts(state, action) {
      state.accounts = action.payload;
      state.loading = false;
      state.error = null;
      state.lastFetched = Date.now();
    },
    clearAccounts(state) {
      state.accounts = null;
      state.loading = false;
      state.error = null;
    },
    addAccount(state, action) {
      state.accounts.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    overwriteAccount(state, action) {
      const { id, ...newData } = action.payload;
      const index = state.accounts.findIndex((account) => account.id === id);
      if (index !== -1) {
        // Create a new accounts array to trigger re-renders
        state.accounts = [
          ...state.accounts.slice(0, index), // accounts before the index
          { id, ...newData }, // updated account
          ...state.accounts.slice(index + 1), // accounts after the index
        ];
      }
    },
    deleteAccount(state, action) {},
    invalidateCache(state) {
      state.lastFetched = null;
    }
  },
});

export const accountActions = accountSlice.actions;
