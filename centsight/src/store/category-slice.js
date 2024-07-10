import { createSlice } from '@reduxjs/toolkit';

const categoryState = { categories: {}, subcategories: {} };
export const categorySlice = createSlice({
  name: 'categories',
  initialState: categoryState,
  reducers: {},
});

export const categoryActions = categorySlice.actions;
