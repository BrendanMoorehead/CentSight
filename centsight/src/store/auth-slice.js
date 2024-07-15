import supabase from './../../utils/supabase';
import { createSlice } from '@reduxjs.toolkit';

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
  reducers: {},
});

export const authActions = authSlice.actions;
