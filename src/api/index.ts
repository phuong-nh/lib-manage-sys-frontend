import { Author, Content, User } from '../types'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export const getContentAuthorInfo = async (id: string) => {
  const response = await fetch(import.meta.env.VITE_API_URL + '/users/basicinfo/' + id, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Failed to get content author info')
  }
  const data = await response.json()
  return data as User
}

export const getBookAuthorInfo = async (id: string) => {
  const response = await fetch(import.meta.env.VITE_API_URL + '/authors/' + id, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Failed to get book author info')
  }
  const data = await response.json()
  return data as Author
}
