import { createAsyncThunk } from '@reduxjs/toolkit'
import { Book } from '../../types'
import { RootState, AppDispatch } from '../../store'
import Cookies from 'js-cookie'

export const fetchBooks = createAsyncThunk<
  Book[],
  void,
  { dispatch: AppDispatch; state: RootState }
>('books/fetchBooks', async (_, thunkAPI) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/books')
    if (!response.ok) {
      throw new Error('Failed to fetch books')
    }
    const data = await response.json()
    return data as Book[]
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message ?? 'Failed to fetch books')
    } else {
      return thunkAPI.rejectWithValue('Failed to fetch books')
    }
  }
})

export const addBook = createAsyncThunk<Book, Book, { dispatch: AppDispatch; state: RootState }>(
  'books/addBook',
  async (book, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')
        },
        body: JSON.stringify(book)
      })
      if (!response.ok) {
        throw new Error('Failed to add book')
      }
      const data = await response.json()
      return data as Book
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message ?? 'Failed to add book')
      } else {
        return thunkAPI.rejectWithValue('Failed to add book')
      }
    }
  }
)

export const updateBook = createAsyncThunk<Book, Book, { dispatch: AppDispatch; state: RootState }>(
  'books/updateBook',
  async (book, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/books/' + book.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')
        },
        body: JSON.stringify(book)
      })
      if (!response.ok) {
        throw new Error('Failed to update book')
      }
      const data = await response.json()
      return data as Book
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message ?? 'Failed to update book')
      } else {
        return thunkAPI.rejectWithValue('Failed to update book')
      }
    }
  }
)

export const removeBook = createAsyncThunk<
  string,
  string,
  { dispatch: AppDispatch; state: RootState }
>('books/removeBook', async (id, thunkAPI) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/books/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
    if (!response.ok) {
      throw new Error('Failed to remove book')
    }
    return id
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message ?? 'Failed to remove book')
    } else {
      return thunkAPI.rejectWithValue('Failed to remove book')
    }
  }
})
