import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Card, Container, Loader, Title, Text, Group, Button, Divider } from '@mantine/core'
import { borrowBookCopy, fetchBookCopies } from '../../features/bookCopies/thunk'
import { RootState, useAppDispatch } from '../../store'
import { fetchBooks } from '../../features/books/thunk'
import { fetchAuthors } from '../../features/authors/thunk'
import { fetchOwnUser } from '../../features/currentUser/thunk'
import parse from 'html-react-parser'
import { Author, Book, BookCopy } from '../../types'

const BookPage = () => {
  const dispatch = useAppDispatch()
  const { bookId } = useParams<{ bookId: string }>()
  const books = useSelector((state: RootState) => state.books.books)
  const bookCopies = useSelector((state: RootState) => state.bookCopies.bookCopies)
  const authors = useSelector((state: RootState) => state.authors.authors)
  const currentUser = useSelector((state: RootState) => state.currentUser.user)
  const currentLoans = useSelector((state: RootState) => state.currentUser.loans)
  const [book, setBook] = useState<Book | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isBorrowing, setIsBorrowing] = useState(false)

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true)
      try {
        await Promise.all([
          dispatch(fetchBooks()),
          dispatch(fetchAuthors()),
          dispatch(fetchBookCopies())
        ])
        setBook(books.find((b) => b.id === bookId) || null)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadBooks()
  }, [dispatch, bookId])

  if (isLoading || !book) {
    return <Loader />
  }

  const authorNames = book.authorIds
    .map((authorId: string) => {
      const author = authors.find((author: Author) => author.id === authorId)
      if (!author) return ''
      return author.isGivenSurName
        ? author.givenName + ' ' + author.surName
        : author.surName + ' ' + author.givenName
    })
    .join(', ')

  const canBorrow =
    currentUser &&
    !isBorrowing &&
    !currentUser?.isBanned &&
    currentLoans.filter((loan) => loan.bookId === book.id).length === 0 &&
    bookCopies.filter((copy: BookCopy) => copy.bookId === book.id && copy.status === 'AVAILABLE')
      .length !== 0

  const onBorrow = async () => {
    const availableBookCopy = bookCopies.find(
      (copy: BookCopy) => copy.bookId === book.id && copy.status === 'AVAILABLE'
    )
    if (availableBookCopy) {
      setIsBorrowing(true) // set borrowing state to true
      await dispatch(borrowBookCopy(availableBookCopy.id))
      await dispatch(fetchOwnUser()) // update user data
      await dispatch(fetchBookCopies()) // update borrowed books data
    }
  }

  return (
    <Container size="md" my="xl">
      <Card>
        <Box sx={{ width: '30vh', maxWidth: '100%' }}>
          {book.imgsrc ? (
            <img src={book.imgsrc} alt={book.title} style={{ height: '100%', width: '100%' }} />
          ) : (
            <img
              src="src/assets/images/greyBook.png"
              alt={book.title}
              style={{ height: '100%', width: '100%' }}
            />
          )}
        </Box>
        <Title order={1}>{book.title}</Title>
        <Title order={4}>By {authorNames}</Title>
        <Text>Description: {book.description}</Text>
        <Text>ISBN: {book.isbn}</Text>
        <Group position="right" my="md">
          <Button disabled={!canBorrow} onClick={onBorrow}>
            Borrow
          </Button>
        </Group>
        <Divider my="sm" variant="dashed" />
        <Title order={3}>About the book</Title>
        <Text>{parse(book.bookBio.content)}</Text>
      </Card>
    </Container>
  )
}

export default BookPage
