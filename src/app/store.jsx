import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { androidAntiTheftApi } from '../services/androidAntiTheftApi'

export const store = configureStore({
  reducer: {
    [androidAntiTheftApi.reducerPath]: androidAntiTheftApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(androidAntiTheftApi.middleware),
})


setupListeners(store.dispatch)