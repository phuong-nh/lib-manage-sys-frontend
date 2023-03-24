import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
// ...
const store = configureStore({
  reducer: rootReducer,
  devTools: true
})
export type RootState = ReturnType<typeof store.getState>

export default store

