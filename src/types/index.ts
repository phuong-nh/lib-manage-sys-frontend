export interface Author {
  id: string
  givenName: string
  surName: string
  isGivenSurName: boolean
  imgsrc?: string
  authorBio: Content
}

export interface Book {
  id: string
  isbn: string
  title: string
  description: string
  bookBio: Content
  publisher: string
  authorIds: string[]
  categoryIds: string[]
  publishedDate: string
  bookCopyIds: string[]
  numberOfCopies: number
  imgsrc?: string
}

export interface BookCopy {
  id: string
  bookId: string
  status: 'AVAILABLE' | 'BORROWED' | 'RESERVED' | 'LOST'
  borrowerId?: string
  borrowDate?: string
  returnDate?: string
}

export interface User {
  id: string
  givenName: string
  surName: string
  isGivenSurName: boolean
  email?: string
  role: 'USER' | 'STAFF' | 'ADMIN' | 'SUPERUSER'
  imgsrc?: string
  isBanned?: boolean
}

export interface Content {
  id: string
  contentType: 'NEWS' | 'BLOG' | 'AUTHOR_BIO' | 'BOOK_BIO' | 'OTHER'
  title: string
  content: string
  imgsrc?: string
  date: string
  showOnHomePage?: boolean
  authorId?: string
}

export interface Category {
  id: string
  name: string
}
