import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '../../types'
import { RootState, AppDispatch } from '../../store'
import Cookies from 'js-cookie'

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { dispatch: AppDispatch; state: RootState }
>('users/fetchUsers', async (_, thunkAPI) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/users', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    const data = await response.json()
    return data as User[]
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message ?? 'Failed to fetch users')
    } else {
      return thunkAPI.rejectWithValue('Failed to fetch users')
    }
  }
})

export const addUser = createAsyncThunk<User, User, { dispatch: AppDispatch; state: RootState }>(
  'users/addUser',
  async (user, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')
        },
        body: JSON.stringify(user)
      })
      if (!response.ok) {
        throw new Error('Failed to add user')
      }
      const data = await response.json()
      return data as User
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message ?? 'Failed to add user')
      } else {
        return thunkAPI.rejectWithValue('Failed to add user')
      }
    }
  }
)

export const updateUser = createAsyncThunk<User, User, { dispatch: AppDispatch; state: RootState }>(
  'users/updateUser',
  async (user, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/users/' + user.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token')
        },
        body: JSON.stringify(user)
      })
      if (!response.ok) {
        throw new Error('Failed to update user')
      }
      const data = await response.json()
      return data as User
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message ?? 'Failed to update user')
      } else {
        return thunkAPI.rejectWithValue('Failed to update user')
      }
    }
  }
)

export const removeUser = createAsyncThunk<
  string,
  string,
  { dispatch: AppDispatch; state: RootState }
>('users/removeUser', async (id, thunkAPI) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/users/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
    if (!response.ok) {
      throw new Error('Failed to remove user')
    }
    return id
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message ?? 'Failed to remove user')
    } else {
      return thunkAPI.rejectWithValue('Failed to remove user')
    }
  }
})
