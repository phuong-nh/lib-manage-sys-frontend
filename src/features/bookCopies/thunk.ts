import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { BookCopy } from '../../types'

// Thunk functions
export const fetchBookCopies = createAsyncThunk(
  'bookCopies/fetchBookCopies',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/copies')
      if (!response.ok) {
        throw new Error('Failed to fetch bookCopies')
      }
      const data = await response.json()
      return data as BookCopy[]
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue('An error occurred while fetching book copies')
    }
  }
)

export const addBookCopy = createAsyncThunk(
  'bookCopies/addBookCopy',
  async (bookCopy: BookCopy, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/copies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')
        },
        body: JSON.stringify(bookCopy)
      })
      if (!response.ok) {
        throw new Error('Failed to add bookCopy')
      }
      const data = await response.json()
      return data as BookCopy
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue('An error occurred while adding book copy')
    }
  }
)

export const updateBookCopy = createAsyncThunk(
  'bookCopies/updateBookCopy',
  async (bookCopy: BookCopy, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/copies/' + bookCopy.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')
        },
        body: JSON.stringify(bookCopy)
      })
      if (!response.ok) {
        throw new Error('Failed to update bookCopy')
      }
      const data = await response.json()
      return data as BookCopy
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue('An error occurred while updating book copy')
    }
  }
)

export const removeBookCopy = createAsyncThunk(
  'bookCopies/deleteBookCopy',
  async (bookCopy: BookCopy, thunkAPI) => {
    try {
      await fetch(import.meta.env.VITE_API_URL + '/copies/' + bookCopy.id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')
        }
      })
      return bookCopy
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue('An error occurred while deleting book copy')
    }
  }
)

export const borrowBookCopy = createAsyncThunk(
  'bookCopies/borrowBookCopy',
  async (id: string, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/copies/' + id + '/borrow', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')
        }
      })
      if (!response.ok) {
        throw new Error('Failed to borrow bookCopy')
      }
      const data = await response.json()
      return data as BookCopy
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue('An error occurred while borrowing book copy')
    }
  }
)

export const returnBookCopy = createAsyncThunk(
  'bookCopies/returnBookCopy',
  async (id: string, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/copies/' + id + '/return', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')
        }
      })
      if (!response.ok) {
        throw new Error('Failed to return bookCopy')
      }
      const data = await response.json()
      return data as BookCopy
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue('An error occurred while returning book copy')
    }
  }
)
