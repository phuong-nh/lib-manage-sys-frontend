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
    }
    // Add more reducers for updating, removing users, etc.
  }
})

export const { addUser, setCurrentUser, setUsers } = usersSlice.actions
export default usersSlice.reducer
