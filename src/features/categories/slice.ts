import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from '../../types'
import { fetchCategories, addCategory, updateCategory, removeCategory } from './thunk'

interface CategoriesState {
  categories: Category[]
  loading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload
        state.loading = false
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch categories'
      })
      // Add Category
      .addCase(addCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.categories.push(action.payload)
        state.loading = false
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to add category'
      })
      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        const updatedCategory = action.payload
        const index = state.categories.findIndex((category) => category.id === updatedCategory.id)
        if (index !== -1) {
          state.categories[index] = updatedCategory
        }
        state.loading = false
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to update category'
      })
      // Remove Category
      .addCase(removeCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeCategory.fulfilled, (state, action: PayloadAction<string>) => {
        const categoryId = action.payload
        const index = state.categories.findIndex((category) => category.id === categoryId)
        if (index !== -1) {
          state.categories.splice(index, 1)
        }
        state.loading = false
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to remove category'
      })
  }
})

export default categoriesSlice.reducer
