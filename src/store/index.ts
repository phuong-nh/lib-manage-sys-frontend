import { configureStore } from '@reduxjs/toolkit'

import { saveDataOnChange } from '../api/middleware/saveDataOnChange'
import rootReducer from './rootReducer'
// ...
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveDataOnChange),
  devTools: false
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
