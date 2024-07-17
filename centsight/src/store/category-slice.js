import { createSlice } from '@reduxjs/toolkit';

const categoryState = { categories: [] };

export const categorySlice = createSlice({
  name: 'categories',
  initialState: categoryState,
  reducers: {
    replaceCategories(state, action) {
      state.categories = action.payload;
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
  },
});

export const categoryActions = categorySlice.actions;
