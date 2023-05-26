import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types'
import { fetchUsers, addUser, updateUser, removeUser } from './thunk'

interface UsersState {
  users: User[]
  loading: boolean
  error: string | null
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload
        state.loading = false
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch users'
      })
      // Add User
      .addCase(addUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload)
        state.loading = false
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to add user'
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const updatedUser = action.payload
        const index = state.users.findIndex((user) => user.id === updatedUser.id)
        if (index !== -1) {
          state.users[index] = updatedUser
        }
        state.loading = false
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to update user'
      })
      // Remove User
      .addCase(removeUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeUser.fulfilled, (state, action: PayloadAction<string>) => {
        const id = action.payload
        state.users = state.users.filter((user) => user.id !== id)
        state.loading = false
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to remove user'
      })
  }
})

export default usersSlice.reducer
