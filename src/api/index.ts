import { Book, Author, User } from '../types';
import * as booksAPI from './localStorage/booksAPI';
import * as authorsAPI from './localStorage/authorsAPI';
import * as usersAPI from './localStorage/usersAPI';
import { mockBooks } from './mock/mockBooks';
import { mockAuthors } from './mock/mockAuthors';
import { mockUsers } from './mock/mockUsers';

const checkLocalStorage = <T>(key: string, fallbackData: T[]): T[] => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  } else {
    localStorage.setItem(key, JSON.stringify(fallbackData));
    return fallbackData;
  }
};

export const getBooks = (): Book[] => {
  return checkLocalStorage<Book>('books', mockBooks);
};

export const getAuthors = (): Author[] => {
  return checkLocalStorage<Author>('authors', mockAuthors);
};

export const getUsers = (): User[] => {
  return checkLocalStorage<User>('users', mockUsers);
};

export const addBook = (book: Book): void => {
  booksAPI.addBook(book);
};

export const updateBook = (book: Book): void => {
  booksAPI.updateBook(book);
};

export const deleteBook = (bookId: string): void => {
  booksAPI.deleteBook(bookId);
};

export const addAuthor = (author: Author): void => {
  authorsAPI.addAuthor(author);
};

export const updateAuthor = (author: Author): void => {
  authorsAPI.updateAuthor(author);
};

export const deleteAuthor = (authorId: string): void => {
  authorsAPI.deleteAuthor(authorId);
};

export const addUser = (user: User): void => {
  usersAPI.addUser(user);
};

export const updateUser = (user: User): void => {
  usersAPI.updateUser(user);
};

export const deleteUser = (userId: string): void => {
  usersAPI.deleteUser(userId);
};
