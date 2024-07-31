import { createSlice } from '@reduxjs/toolkit';
import { addSubcategory } from './category-actions';

const categoryState = { categories: {} };

export const categorySlice = createSlice({
  name: 'categories',
  initialState: categoryState,
  reducers: {
    replaceCategories(state, action) {
      state.categories = action.payload;
    },
    clearCategories(state) {
      state.categories = null;
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    addSubcategory(state, action) {
      const parent = state.categories.find(
        ({ id }) => id === action.payload.category_id
      );

      parent.subcategories.push(action.payload);
    },
    deleteCategory(state, action) {
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload.id
      );
    },
    deleteSubcategory(state, action) {
      console.log('Delete', action.payload);
      const parent = state.categories.find(
        ({ id }) => id === action.payload.category_id
      );
      const index = parent.subcategories.findIndex(
        (sub) => sub.id === action.payload.id
      );
      if (index === -1) return; // Early return if the subcategory is not found

      // Remove the subcategory immutably
      parent.subcategories = parent.subcategories.filter(
        (sub) => sub.id !== action.payload.id
      );
    },
  },
});

export const categoryActions = categorySlice.actions;
