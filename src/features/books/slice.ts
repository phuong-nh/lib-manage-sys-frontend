import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Book } from '../../types'

const initialState: Book[] = []

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.push(action.payload)
    }
    // Add more reducers for updating, removing books, etc.
  }
})

export const { addBook } = booksSlice.actions
export default booksSlice.reducer
