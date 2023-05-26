import { createAsyncThunk } from '@reduxjs/toolkit'
import { Category } from '../../types'

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/categories')
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      const data = await response.json()
      return data as Category[]
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message ?? 'Failed to fetch categories')
      }
      return thunkAPI.rejectWithValue('Failed to fetch categories')
    }
  }
)

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (category: Category, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(category)
      })
      if (!response.ok) {
        throw new Error('Failed to add category')
      }
      const data = await response.json()
      return data as Category
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message ?? 'Failed to add category')
      }
      return thunkAPI.rejectWithValue('Failed to add category')
    }
  }
)

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (category: Category, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/categories/' + category.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(category)
      })
      if (!response.ok) {
        throw new Error('Failed to update category')
      }
      const data = await response.json()
      return data as Category
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message ?? 'Failed to update category')
      }
      return thunkAPI.rejectWithValue('Failed to update category')
    }
  }
)

export const removeCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: string, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/categories/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error('Failed to delete category')
      }
      return id
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message ?? 'Failed to delete category')
      }
      return thunkAPI.rejectWithValue('Failed to delete category')
    }
  }
)
