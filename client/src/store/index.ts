import { configureStore } from '@reduxjs/toolkit'
import splashReducer from './slices/splashSlice'
import navReducer from './slices/navSlice'
import contactReducer from './slices/contactSlice'

export const store = configureStore({
  reducer: {
    splash: splashReducer,
    nav: navReducer,
    contact: contactReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
