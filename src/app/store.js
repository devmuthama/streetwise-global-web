import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { adminApiSlice } from '../features/admin/adminApiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApiSlice.middleware),
})