import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { getUsers } from '../../api'
import { loadCurrentUser } from '../../api/localStorage/usersAPI'
import { User } from '../../types'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: getUsers(),
    currentUser: loadCurrentUser()
  },
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    addUser: (state, action: PayloadAction<User>) => {
      if (state.users.findIndex((user: User) => user.id === action.payload.id) === -1)
        state.users.push(action.payload)
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((user: User) => user.id === action.payload.id)
      if (index !== -1) state.users[index] = action.payload
      if (state.currentUser?.id === action.payload.id) state.currentUser = action.payload
    },
    removeUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((user: User) => user.id === action.payload.id)
      if (index !== -1) state.users.splice(index, 1)
    }
    // Add more reducers for updating, removing users, etc.
  }
})

export const { addUser, setCurrentUser, setUsers, updateUser, removeUser } = usersSlice.actions
export default usersSlice.reducer
