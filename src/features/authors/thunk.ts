import { createAsyncThunk } from '@reduxjs/toolkit'
import { Author } from '../../types'
import { RootState } from '../../store'
import Cookies from 'js-cookie'

export const fetchAuthors = createAsyncThunk<Author[], void, { state: RootState }>(
  'authors/fetchAuthors',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/authors')
      if (!response.ok) {
        throw new Error('Failed to fetch authors')
      }
      const data = await response.json()
      return data as Author[]
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message ?? 'Failed to fetch authors')
      }
      return thunkAPI.rejectWithValue('Failed to fetch authors')
    }
  }
)

export const addAuthor = createAsyncThunk<Author, Author, { state: RootState }>(
  'authors/addAuthor',
  async (author, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')
        },
        body: JSON.stringify(author)
      })
      if (!response.ok) {
        throw new Error('Failed to add author')
      }
      const data = await response.json()
      return data as Author
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message ?? 'Failed to add author')
      }
      return thunkAPI.rejectWithValue('Failed to add author')
    }
  }
)

export const updateAuthor = createAsyncThunk<Author, Author, { state: RootState }>(
  'authors/updateAuthor',
  async (author, thunkAPI) => {
    try {
      // console.log(author)
      const response = await fetch(import.meta.env.VITE_API_URL + '/authors/' + author.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')
        },
        body: JSON.stringify(author)
      })
      if (!response.ok) {
        throw new Error('Failed to update author')
      }
      const data = await response.json()
      return data as Author
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message ?? 'Failed to update author')
      }
      return thunkAPI.rejectWithValue('Failed to update author')
    }
  }
)

export const removeAuthor = createAsyncThunk<string, string, { state: RootState }>(
  'authors/removeAuthor',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/authors/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')
        }
      })
      if (!response.ok) {
        throw new Error('Failed to remove author')
      }
      return id
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message ?? 'Failed to remove author')
      }
      return thunkAPI.rejectWithValue('Failed to remove author')
    }
  }
)
