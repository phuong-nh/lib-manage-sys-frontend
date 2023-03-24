import { combineReducers } from '@reduxjs/toolkit'
import booksReducer from '../features/books/slice'
import authorsReducer from '../features/authors/slice'
import usersReducer from '../features/users/slice'

const rootReducer = combineReducers({
  books: booksReducer,
  authors: authorsReducer,
  users: usersReducer
})

export default rootReducer
