import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Book } from '../../types'
import { fetchBooks, addBook, updateBook, removeBook } from './thunk'

interface BooksState {
  books: Book[]
  loading: boolean
  error: string | null
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.books = action.payload
        state.loading = false
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch books'
      })
      // Add Book
      .addCase(addBook.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.books.push(action.payload)
        state.loading = false
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to add book'
      })
      // Update Book
      .addCase(updateBook.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
        const updatedBook = action.payload
        const index = state.books.findIndex((book) => book.id === updatedBook.id)
        if (index !== -1) {
          state.books[index] = updatedBook
        }
        state.loading = false
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to update book'
      })
      // Remove Book
      .addCase(removeBook.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeBook.fulfilled, (state, action: PayloadAction<string>) => {
        const id = action.payload
        state.books = state.books.filter((book) => book.id !== id)
        state.loading = false
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to remove book'
      })
  }
})

export default booksSlice.reducer
