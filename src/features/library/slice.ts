import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAuthors, getBooks } from '../../api'
import { Book, Author } from '../../types'

export const librarySlice = createSlice({
  name: 'library',
  initialState: {
    books: getBooks(),
    authors: getAuthors(),
  },
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload
    },
    borrowBook: (
      state,
      action: PayloadAction<{ bookId: string; borrowerId: string; borrowDate: string }>
    ) => {
      const book = state.books.find((book) => book.id === action.payload.bookId)
      if (book) {
        const availableCopy = book.copies.find((copy) => copy.status === 'available')
        if (availableCopy) {
          availableCopy.status = 'borrowed'
          availableCopy.borrowerId = action.payload.borrowerId
          availableCopy.borrowDate = action.payload.borrowDate
        }
      }
    },
    returnBook: (
      state,
      action: PayloadAction<{ bookId: string; copyId: string; returnDate: string }>
    ) => {
      const book = state.books.find((book) => book.id === action.payload.bookId)
      if (book) {
        const borrowedCopy = book.copies.find((copy) => copy.id === action.payload.copyId)
        if (borrowedCopy) {
          borrowedCopy.status = 'available'
          borrowedCopy.borrowerId = null
          borrowedCopy.returnDate = action.payload.returnDate
        }
      }
    },
    // Book related reducers
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload)
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex((book) => book.id === action.payload.id)
      if (index !== -1) {
        state.books[index] = action.payload
      }
    },
    removeBook: (state, action: PayloadAction<string>) => {
      const index = state.books.findIndex((book) => book.id === action.payload)
      if (index !== -1) {
        state.books.splice(index, 1)
      }
    },
    // Author related reducers
    setAuthors: (state, action: PayloadAction<Author[]>) => {
      state.authors = action.payload
    },
    addAuthor: (state, action: PayloadAction<Author>) => {
      state.authors.push(action.payload)
    },
    updateAuthor: (state, action: PayloadAction<Author>) => {
      const index = state.authors.findIndex((author) => author.id === action.payload.id)
      if (index !== -1) {
        state.authors[index] = action.payload
      }
    },
    removeAuthor: (state, action: PayloadAction<string>) => {
      const index = state.authors.findIndex((author) => author.id === action.payload)
      if (index !== -1) {
        state.authors.splice(index, 1)
      }
    }
  }
})

export const {
  borrowBook,
  returnBook,
  addBook,
  updateBook,
  removeBook,
  addAuthor,
  updateAuthor,
  removeAuthor,
  setBooks,
  setAuthors
} = librarySlice.actions

export default librarySlice.reducer
