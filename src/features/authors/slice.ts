import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Author } from '../../types'
import { fetchAuthors, addAuthor, updateAuthor, removeAuthor } from './thunk'

interface AuthorsState {
  authors: Author[]
  loading: boolean
  error: string | null
}

const initialState: AuthorsState = {
  authors: [],
  loading: false,
  error: null
}

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Authors
      .addCase(fetchAuthors.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAuthors.fulfilled, (state, action: PayloadAction<Author[]>) => {
        state.authors = action.payload
        state.loading = false
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch authors'
      })
      // Add Author
      .addCase(addAuthor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addAuthor.fulfilled, (state, action: PayloadAction<Author>) => {
        state.authors.push(action.payload)
        state.loading = false
      })
      .addCase(addAuthor.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to add author'
      })
      // Update Author
      .addCase(updateAuthor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateAuthor.fulfilled, (state, action: PayloadAction<Author>) => {
        const updatedAuthor = action.payload
        const index = state.authors.findIndex((author) => author.id === updatedAuthor.id)
        if (index !== -1) {
          state.authors[index] = updatedAuthor
        }
        state.loading = false
      })
      .addCase(updateAuthor.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to update author'
      })
      // Remove Author
      .addCase(removeAuthor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeAuthor.fulfilled, (state, action: PayloadAction<string>) => {
        const id = action.payload
        state.authors = state.authors.filter((author) => author.id !== id)
        state.loading = false
      })
      .addCase(removeAuthor.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to remove author'
      })
  }
})

export default authorsSlice.reducer
