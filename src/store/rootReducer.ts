import { combineReducers } from '@reduxjs/toolkit'

import usersReducer from '../features/users/slice'
import currentUserReducer from '../features/currentUser/slice'
import booksReducer from '../features/books/slice'
import authorsReducer from '../features/authors/slice'
import contentsReducer from '../features/contents/slice'
import bookCopiesReducer from '../features/bookCopies/slice'
import categoriesReducer from '../features/categories/slice'

const rootReducer = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer,
  books: booksReducer,
  bookCopies: bookCopiesReducer,
  authors: authorsReducer,
  contents: contentsReducer,
  categories: categoriesReducer
})

export default rootReducer
