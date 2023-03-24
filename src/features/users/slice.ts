import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types'

const initialState = {
  users: [] as User[],
  currentUser: null as User | null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      if (state.users.findIndex((user: User) => user.email === action.payload.email) === -1)
        state.users.push(action.payload)
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    }
    // Add more reducers for updating, removing users, etc.
  }
})

export const { addUser, setCurrentUser } = usersSlice.actions
export default usersSlice.reducer
