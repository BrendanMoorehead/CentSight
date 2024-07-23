import { createSlice } from '@reduxjs/toolkit';
import { addSubcategory } from './category-actions';

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
    addSubcategory(state, action) {
      let parent;
      console.log('Payload', action.payload);
      parent = state.categories.find(
        ({ id }) => id === action.payload.category_id
      );

      parent.subcategories.push(action.payload);
    },
  },
});

export const categoryActions = categorySlice.actions;
