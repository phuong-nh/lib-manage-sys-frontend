import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from '../features/users/slice'
import libraryReducer from '../features/library/slice'

const rootReducer = combineReducers({
  users: usersReducer,
  library: libraryReducer,
})

export default rootReducer
