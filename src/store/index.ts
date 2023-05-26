import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import rootReducer from './rootReducer'
import { useDispatch } from 'react-redux'
// ...
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: (arg?: unknown) => AppDispatch = useDispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
export default store
