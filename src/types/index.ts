export interface Author {
  givenName: string | null
  surName: string | null
  fullName: string
  imgsrc: string | null
}

export interface Book {
  ISBN: string
  title: string
  description: string
  publisher: string
  authors: Author[]
  status: 'available' | 'borrowed'
  borrowerEmail: string | null
  publishedDate: string
  borrowDate: string | null
  returnDate: string | null
}

export interface User {
  givenName: string | null
  surName: string | null
  fullName: string
  email: string
  role: 'user' | 'admin'
  imgsrc: string | null
}
