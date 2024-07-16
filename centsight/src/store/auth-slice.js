import { createSlice } from '@reduxjs/toolkit';

const authState = { loading: false, user: null, error: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    loginUser(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    logoutUser(state) {
      state.loading = false;
      state.user = null;
    },
  },
});

export const authActions = authSlice.actions;
