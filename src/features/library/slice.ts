import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAuthors, getBooks } from '../../api'
import { Book, Author } from '../../types'

export const librarySlice = createSlice({
  name: 'library',
  initialState: {
    books: getBooks(),
    authors: getAuthors()
  },
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      return { books: action.payload, authors: state.authors }
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
      return { books: [...state.books, action.payload], authors: state.authors }
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex((book) => book.id === action.payload.id)
      if (index !== -1) {
        return {
          books: [...state.books.slice(0, index), action.payload, ...state.books.slice(index + 1)],
          authors: state.authors
        }
      }
    },
    removeBook: (state, action: PayloadAction<string>) => {
      const index = state.books.findIndex((book) => book.id === action.payload)
      if (index !== -1) {
        return {
          books: [...state.books.slice(0, index), ...state.books.slice(index + 1)],
          authors: state.authors
        }
      }
    },
    // Author related reducers
    setAuthors: (state, action: PayloadAction<Author[]>) => {
      return { books: state.books, authors: action.payload }
    },
    addAuthor: (state, action: PayloadAction<Author>) => {
      return { books: state.books, authors: [...state.authors, action.payload] }
    },
    updateAuthor: (state, action: PayloadAction<Author>) => {
      const index = state.authors.findIndex((author) => author.id === action.payload.id)
      if (index !== -1) {
        return {
          books: state.books,
          authors: [...state.authors.slice(0, index), action.payload, ...state.authors.slice(index + 1)]
        }
      }
    },
    removeAuthor: (state, action: PayloadAction<string>) => {
      const index = state.authors.findIndex((author) => author.id === action.payload)
      if (index !== -1) {
        return {
          books: state.books,
          authors: [...state.authors.slice(0, index), ...state.authors.slice(index + 1)]
        }
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
