import { Middleware } from '@reduxjs/toolkit'
import { saveBooks } from '../localStorage/booksAPI'
import { saveAuthors } from '../localStorage/authorsAPI'
import { saveCurrentUser, saveUsers } from '../localStorage/usersAPI'
import { RootState } from '../../store'
import { saveContent } from '../localStorage/contentAPI'

const actionsToWatch = [
  'library/setBooks',
  'library/updateBook',
  'library/borrowBook',
  'library/returnBook',
  'library/addBook',
  'library/removeBook',
  'library/setAuthors',
  'library/updateAuthor',
  'users/setUsers',
  'users/updateUser',
  'users/addUser',
  'users/setCurrentUser',
  'users/removeUser',
  'users/logout',
  'content/setContent',
  'content/addContent',
  'content/updateContent',
  'content/removeContent'
  // Add other actions that modify data here
]

export const saveDataOnChange: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action)

  if (actionsToWatch.includes(action.type)) {
    const state: RootState = storeAPI.getState()

    console.log('Saving data to localStorage...')

    // Save data to localStorage
    saveBooks(state.library.books)
    saveAuthors(state.library.authors)
    saveUsers(state.users.users)
    saveCurrentUser(state.users.currentUser)
    saveContent(state.contents)
  }

  return result
}
