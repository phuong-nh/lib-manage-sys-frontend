export interface Author {
  id: string;
  givenName: string | null;
  surName: string | null;
  fullName: string;
  imgsrc: string | null;
}

export interface Book {
  id: string;
  ISBN: string;
  title: string;
  description: string;
  publisher: string;
  authors: Author[];
  publishedDate: string;
  copies: BookCopy[];
  imgsrc: string | null;
}

export interface BookCopy {
  id: string;
  status: 'available' | 'borrowed';
  borrowerId: string | null;
  borrowDate: string | null;
  returnDate: string | null;
}

export interface User {
  id: string;
  givenName: string | null;
  surName: string | null;
  fullName: string;
  email: string;
  role: 'user' | 'admin';
  imgsrc: string | null;
}