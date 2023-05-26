import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { BookCopy, User } from '../../types'
import jwtDecode from 'jwt-decode'

type LoginPayload = {
  email: string
  password: string
}

type RegisterPayload = {
  email: string
  password: string
  givenName: string
  surName: string
  isGivenSurName: boolean
}

export const loginUser = createAsyncThunk(
  'currentUser/login',
  async (payload: LoginPayload, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Failed to login')
      }

      const data = await response.json()

      // Save JWT to a cookie
      Cookies.set('token', data.token)

      // Fetch user info
      thunkAPI.dispatch(fetchOwnUser())
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to login')
    }
  }
)

export const registerUser = createAsyncThunk(
  'currentUser/register',
  async (payload: RegisterPayload, thunkAPI) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Failed to register')
      }

      const data = await response.json()

      console.log(data)

      // Save JWT to a cookie
      Cookies.set('token', data.token)

      // Fetch user info
      thunkAPI.dispatch(fetchOwnUser())
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to register')
    }
  }
)

export const fetchOwnUser = createAsyncThunk('currentUser/fetchOwnUser', async (_, thunkAPI) => {
  try {
    if (!Cookies.get('token')) {
      throw new Error('No token found')
    }

    if (Cookies.get('token') === 'undefined') {
      throw new Error('Token is undefined')
    }

    const jwtObject = jwtDecode<{ sub: string; iat: number; exp: number }>(
      Cookies.get('token') as string
    )
    if (jwtObject.exp < Date.now() / 1000) {
      // Logout user if token is expired
      thunkAPI.dispatch(logoutUser())
      throw new Error('Token expired')
    }

    const userResponse = await fetch(import.meta.env.VITE_API_URL + '/users/owninfo', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })

    if (!userResponse.ok) {
      // Logout user if authentication fails
      thunkAPI.dispatch(logoutUser())
      throw new Error('Failed to fetch user info')
    }

    const userData = await userResponse.json()

    const loansResponse = await fetch(import.meta.env.VITE_API_URL + '/users/ownloans', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })

    if (!loansResponse.ok) {
      throw new Error('Failed to fetch user info')
    }

    const loansData = await loansResponse.json()

    return { user: userData as User, loans: loansData as Array<BookCopy> }
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch user info')
  }
})

export const logoutUser = createAsyncThunk('currentUser/logout', async (_, thunkAPI) => {
  try {
    Cookies.remove('token')
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to logout')
  }
})
