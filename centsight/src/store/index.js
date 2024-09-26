import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { categorySlice } from './category-slice';
import { transactionSlice } from './transaction-slice';
import { authSlice } from './auth-slice';
import { accountSlice } from './account-slice';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({ 
  auth: authSlice.reducer,
    category: categorySlice.reducer,
    transaction: transactionSlice.reducer,
    account: accountSlice.reducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);