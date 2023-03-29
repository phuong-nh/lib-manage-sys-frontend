import { combineReducers } from '@reduxjs/toolkit'

import usersReducer from '../features/users/slice'
import libraryReducer from '../features/library/slice'
import contentReducer from '../features/content/slice'

const rootReducer = combineReducers({
  users: usersReducer,
  library: libraryReducer,
  contents: contentReducer
})

export default rootReducer
