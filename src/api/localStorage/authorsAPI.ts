import { Author } from '../../types'

const AUTHORS_KEY = 'authors'

export const loadAuthors = (): Author[] => {
  const authorsJSON = localStorage.getItem(AUTHORS_KEY)
  return authorsJSON ? JSON.parse(authorsJSON) : []
}

export const saveAuthors = (authors: Author[]): void => {
  localStorage.setItem(AUTHORS_KEY, JSON.stringify(authors))
}

export const addAuthor = (author: Author): void => {
  const authors = loadAuthors()
  authors.push(author)
  saveAuthors(authors)
}

export const updateAuthor = (author: Author): void => {
  const authors = loadAuthors()
  const index = authors.findIndex((a) => a.fullName === author.fullName)
  if (index !== -1) {
    authors[index] = author
    saveAuthors(authors)
  }
}

export const deleteAuthor = (fullName: string): void => {
  const authors = loadAuthors()
  const filteredAuthors = authors.filter((a) => a.fullName !== fullName)
  saveAuthors(filteredAuthors)
}
