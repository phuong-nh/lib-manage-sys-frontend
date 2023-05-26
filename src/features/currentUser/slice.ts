import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BookCopy, User } from '../../types'
import { loginUser, registerUser, fetchOwnUser, logoutUser } from './thunk'

interface CurrentUserState {
  user: User | null
  loading: boolean
  error: string | null
  loans: BookCopy[]
}

const initialState: CurrentUserState = {
  user: null,
  loading: false,
  error: null,
  loans: []
}

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to login'
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to register'
      })
      .addCase(
        fetchOwnUser.fulfilled,
        (state, action: PayloadAction<{ user: User; loans: Array<BookCopy> }>) => {
          state.user = action.payload.user
          state.loans = action.payload.loans
          state.loading = false
        }
      )
      .addCase(fetchOwnUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch user info'
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.loading = false
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to logout'
      })
  }
})
export default currentUserSlice.reducer
