import { User } from '../../types'

const USERS_KEY = 'users'
const CURRENT_USER_KEY = 'current_user'

export const loadUsers = (): User[] => {
  const usersJSON = localStorage.getItem(USERS_KEY)
  return usersJSON ? JSON.parse(usersJSON) : []
}

export const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const addUser = (user: User): void => {
  const users = loadUsers()
  users.push(user)
  saveUsers(users)
}

export const updateUser = (user: User): void => {
  const users = loadUsers()
  const index = users.findIndex((u) => u.email === user.email)
  if (index !== -1) {
    users[index] = user
    saveUsers(users)
  }
}

export const deleteUser = (email: string): void => {
  const users = loadUsers()
  const filteredUsers = users.filter((u) => u.email !== email)
  saveUsers(filteredUsers)
}

export const saveCurrentUser = (user: User | null): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
}

export const loadCurrentUser = (): User | null => {
  console.log('loadCurrentUser')
  const currentUserJSON = localStorage.getItem(CURRENT_USER_KEY)
  return currentUserJSON ? JSON.parse(currentUserJSON) : null
}
