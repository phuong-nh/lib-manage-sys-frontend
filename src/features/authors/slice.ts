import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Author } from '../../types'

const initialState: Author[] = []

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    addAuthor: (state, action: PayloadAction<Author>) => {
      state.push(action.payload)
    }
    // Add more reducers for updating, removing authors, etc.
  }
})

export const { addAuthor } = authorsSlice.actions
export default authorsSlice.reducer
