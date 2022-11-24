import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../features/user'

export const store = configureStore({
  reducer: {
    user: userSlice
  },
})