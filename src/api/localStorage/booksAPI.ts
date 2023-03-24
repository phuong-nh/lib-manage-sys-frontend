import { Book } from "../../types";

const BOOKS_KEY = "books";

export const loadBooks = (): Book[] => {
  const booksJSON = localStorage.getItem(BOOKS_KEY);
  return booksJSON ? JSON.parse(booksJSON) : [];
};

export const saveBooks = (books: Book[]): void => {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
};

export const addBook = (book: Book): void => {
  const books = loadBooks();
  books.push(book);
  saveBooks(books);
};

export const updateBook = (book: Book): void => {
  const books = loadBooks();
  const index = books.findIndex(b => b.ISBN === book.ISBN);
  if (index !== -1) {
    books[index] = book;
    saveBooks(books);
  }
};

export const deleteBook = (ISBN: string): void => {
  const books = loadBooks();
  const filteredBooks = books.filter(b => b.ISBN !== ISBN);
  saveBooks(filteredBooks);
};