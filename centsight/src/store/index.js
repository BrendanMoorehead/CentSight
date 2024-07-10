import { configureStore, createSlice } from '@reduxjs/toolkit';

const categoryState = { categories: {}, subcategories: {} };

const categorySlice = createSlice({
  name: 'categories',
  initialState: categoryState,
  reducers: {},
});

const store = configureStore({ reducer: { category: categorySlice.reducer } });

export default store;
