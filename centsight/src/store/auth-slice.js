import { createSlice } from '@reduxjs/toolkit';

const authState = { loading: false, user: null, error: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
      state.error = null;
    },
    loginUser(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    logoutUser(state) {
      state.loading = false;
      state.user = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const authActions = authSlice.actions;
