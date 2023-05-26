import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Content } from '../../types'
import { fetchContents, addContent, updateContent, removeContent } from './thunk'

interface ContentState {
  contents: Content[]
  loading: boolean
  error: string | null
}

const initialState: ContentState = {
  contents: [],
  loading: false,
  error: null
}

const contentSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Contents
      .addCase(fetchContents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchContents.fulfilled, (state, action: PayloadAction<Content[]>) => {
        state.contents = action.payload
        state.loading = false
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch contents'
      })
      // Add Content
      .addCase(addContent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addContent.fulfilled, (state, action: PayloadAction<Content>) => {
        state.contents.push(action.payload)
        state.loading = false
      })
      .addCase(addContent.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to add content'
      })
      // Update Content
      .addCase(updateContent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateContent.fulfilled, (state, action: PayloadAction<Content>) => {
        const updatedContent = action.payload
        const index = state.contents.findIndex((content) => content.id === updatedContent.id)
        if (index !== -1) {
          state.contents[index] = updatedContent
        }
        state.loading = false
      })
      .addCase(updateContent.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to update content'
      })
      // Remove Content
      .addCase(removeContent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeContent.fulfilled, (state, action: PayloadAction<string>) => {
        const id = action.payload
        state.contents = state.contents.filter((content) => content.id !== id)
        state.loading = false
      })
      .addCase(removeContent.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to remove content'
      })
  }
})

export default contentSlice.reducer
