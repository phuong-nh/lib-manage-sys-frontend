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
      return { users: action.payload, currentUser: state.currentUser }
    },
    addUser: (state, action: PayloadAction<User>) => {
      if (state.users.findIndex((user: User) => user.id === action.payload.id) === -1)
        return { users: [...state.users, action.payload], currentUser: state.currentUser }
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      return { users: state.users, currentUser: action.payload }
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((user: User) => user.id === action.payload.id)
      if (index !== -1)
        return {
          users: [...state.users.slice(0, index), action.payload, ...state.users.slice(index + 1)],
          currentUser: state.currentUser
        }
      if (state.currentUser?.id === action.payload.id)
        return { users: state.users, currentUser: action.payload }
    },
    removeUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((user: User) => user.id === action.payload.id)
      if (index !== -1)
        return {
          users: [...state.users.slice(0, index), ...state.users.slice(index + 1)],
          currentUser: state.currentUser
        }
    }
  }
})

export const { addUser, setCurrentUser, setUsers, updateUser, removeUser } = usersSlice.actions
export default usersSlice.reducer
