import { createSlice } from '@reduxjs/toolkit';

const categoryState = { categories: [], loading: false, error: null };

export const categorySlice = createSlice({
  name: 'categories',
  initialState: categoryState,
  reducers: {
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    replaceCategories(state, action) {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },

    clearCategories(state) {
      state.categories = null;
      state.loading = false;
      state.error = null;
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addSubcategory(state, action) {
      let parent;
      parent = state.categories.find(
        ({ id }) => id === action.payload.category_id
      );
      parent = state.categories.find(
        ({ id }) => id === action.payload.user_category_id
      );

      parent.subcategories.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteCategory(state, action) {
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload.id
      );
    },
    deleteSubcategory(state, action) {
      const parent = state.categories.find(
        ({ id }) => id === action.payload.category_id
      );
      const index = parent.subcategories.findIndex(
        (sub) => sub.id === action.payload.id
      );
      if (index === -1) return;
      parent.subcategories = parent.subcategories.filter(
        (sub) => sub.id !== action.payload.id
      );
    },
    updateCategoryName(state, action) {
      const category = state.categories.find(
        ({ id }) => id === action.payload.id
      );
      category.name = action.payload.name;
    },
  },
});

export const categoryActions = categorySlice.actions;
