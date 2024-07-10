import { configureStore, createSlice } from '@reduxjs/toolkit';

const categoryState = {};

createSlice({
  name: 'categories',
  initialState: categoryState,
});
