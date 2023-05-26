import { createSlice } from '@reduxjs/toolkit'
import { BookCopy } from '../../types'
import {
  fetchBookCopies,
  addBookCopy,
  updateBookCopy,
  removeBookCopy,
  borrowBookCopy,
  returnBookCopy
} from './thunk'

interface BookCopiesState {
  loading: boolean
  error: string | null
  bookCopies: BookCopy[]
}

const initialState: BookCopiesState = {
  loading: false,
  error: null,
  bookCopies: []
}

const bookCopiesSlice = createSlice({
  name: 'bookCopies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookCopies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBookCopies.fulfilled, (state, action) => {
        state.loading = false
        state.bookCopies = action.payload
      })
      .addCase(fetchBookCopies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch bookCopies'
      })
      .addCase(addBookCopy.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addBookCopy.fulfilled, (state, action) => {
        state.loading = false
        state.bookCopies.push(action.payload)
      })
      .addCase(addBookCopy.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to add bookCopy'
      })
      .addCase(updateBookCopy.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateBookCopy.fulfilled, (state, action) => {
        state.loading = false
        const updatedBookCopy = action.payload
        const index = state.bookCopies.findIndex((copy) => copy.id === updatedBookCopy.id)
        if (index !== -1) {
          state.bookCopies[index] = updatedBookCopy
        }
      })
      .addCase(updateBookCopy.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to update bookCopy'
      })
      .addCase(removeBookCopy.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeBookCopy.fulfilled, (state, action) => {
        state.loading = false
        const deletedBookCopy = action.payload
        state.bookCopies = state.bookCopies.filter((copy) => copy.id !== deletedBookCopy.id)
      })
      .addCase(removeBookCopy.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to delete bookCopy'
      })
      .addCase(borrowBookCopy.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(borrowBookCopy.fulfilled, (state, action) => {
        state.loading = false
        const updatedBookCopy = action.payload
        const index = state.bookCopies.findIndex((copy) => copy.id === updatedBookCopy.id)
        if (index !== -1) {
          state.bookCopies[index] = updatedBookCopy
        }
      })
      .addCase(borrowBookCopy.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to borrow bookCopy'
      })
      .addCase(returnBookCopy.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(returnBookCopy.fulfilled, (state, action) => {
        state.loading = false
        const updatedBookCopy = action.payload
        const index = state.bookCopies.findIndex((copy) => copy.id === updatedBookCopy.id)
        if (index !== -1) {
          state.bookCopies[index] = updatedBookCopy
        }
      })
      .addCase(returnBookCopy.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to return bookCopy'
      })
  }
})

export default bookCopiesSlice.reducer
