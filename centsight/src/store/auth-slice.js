import supabase from './../../utils/supabase';
import { createSlice } from '@reduxjs/toolkit';

const authState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    loginUser(state, action) {
      //TODO: Massage data to match state
      state.auth = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
