import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import itemsReducer from './itemsSlice'
import { apiSlice } from './apiSlice'

/* const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
  next(action)
  window.localStorage.setItem('session_state', JSON.stringify(store.getState()))
} */

export const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)/* .concat(persistanceLocalStorageMiddleware) */
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch