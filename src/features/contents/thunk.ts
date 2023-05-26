import { createAsyncThunk } from '@reduxjs/toolkit'
import { Content } from '../../types'
import { RootState } from '../../store'
import Cookies from 'js-cookie'

export const fetchContents = createAsyncThunk<Content[], void, { state: RootState }>(
  'contents/fetchContents',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/contents')
      if (!response.ok) {
        throw new Error('Failed to fetch contents')
      }
      const data = await response.json()
      return data as Content[]
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message ?? 'Failed to fetch contents')
      }
      return thunkAPI.rejectWithValue('Failed to fetch contents')
    }
  }
)

export const addContent = createAsyncThunk<Content, Content, { state: RootState }>(
  'contents/addContent',
  async (content, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/contents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')
        },
        body: JSON.stringify(content)
      })
      if (!response.ok) {
        throw new Error('Failed to add content')
      }
      const data = await response.json()
      return data as Content
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message ?? 'Failed to add content')
      }
      return thunkAPI.rejectWithValue('Failed to add content')
    }
  }
)

export const updateContent = createAsyncThunk<Content, Content, { state: RootState }>(
  'contents/updateContent',
  async (content, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/contents/' + content.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')
        }
      })
      if (!response.ok) {
        throw new Error('Failed to update content')
      }
      const data = await response.json()
      return data as Content
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message ?? 'Failed to update content')
      }
      return thunkAPI.rejectWithValue('Failed to update content')
    }
  }
)

export const removeContent = createAsyncThunk<string, string, { state: RootState }>(
  'contents/removeContent',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/contents/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')
        }
      })
      if (!response.ok) {
        throw new Error('Failed to remove content')
      }
      return id
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message ?? 'Failed to remove content')
      }
      return thunkAPI.rejectWithValue('Failed to remove content')
    }
  }
)
