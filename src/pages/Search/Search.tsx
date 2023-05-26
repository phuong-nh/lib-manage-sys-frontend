import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  Loader,
  Pagination,
  TextInput,
  Title
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconExternalLink } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import SearchCard from '../../components/BookOverviewCard'
import { RootState, useAppDispatch } from '../../store'
import { fetchBooks } from '../../features/books/thunk'
import { Author, Book, BookCopy } from '../../types'
import { fetchAuthors } from '../../features/authors/thunk'
import { borrowBookCopy, fetchBookCopies } from '../../features/bookCopies/thunk'
import { fetchOwnUser } from '../../features/currentUser/thunk'
import { useNavigate } from 'react-router'

const Search = () => {
  const dispatch = useAppDispatch()
  const books = useSelector((state: RootState) => state.books.books)
  const bookCopies = useSelector((state: RootState) => state.bookCopies.bookCopies)
  const authors = useSelector((state: RootState) => state.authors.authors)
  const currentUser = useSelector((state: RootState) => state.currentUser.user)
  const currentLoans = useSelector((state: RootState) => state.currentUser.loans)
  const [searchResults, setSearchResults] = useState<Book[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isBorrowing, setIsBorrowing] = useState(false)
  const [searchPage, setSearchPage] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true)
      try {
        await Promise.all([
          dispatch(fetchBooks()),
          dispatch(fetchAuthors()),
          dispatch(fetchBookCopies())
        ])
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadBooks()
  }, [dispatch])

  useEffect(() => {
    setSearchResults(books)
  }, [books])

  useEffect(() => {
    if (searchParams.get('value')) {
      updateSearchResult(searchParams.get('value') || '')
    }
  }, [searchParams, books])

  const form = useForm({
    initialValues: {
      searchTerms: searchParams.get('value') || ''
    },

    validate: {
      searchTerms: (value) => {
        if (!value) {
          return 'Search terms are required'
        } else if (value.length < 3) {
          return 'Search terms must be at least 3 characters long'
        } else {
          return null
        }
      }
    }
  })

  const getSearchList = (page: number) => {
    if (page === (searchResults.length - 1) / 5 + 1) {
      return searchResults.slice((page - 1) * 5, searchResults.length)
    } else {
      return searchResults.slice((page - 1) * 5, page * 5)
    }
  }

  const updateSearchResult = (searchTerms: string) => {
    setSearchResults(
      books.filter((book: Book) => {
        return (
          book.title.toLowerCase().includes(searchTerms.toLowerCase()) ||
          authors
            .filter((author) => book.authorIds.includes(author.id))
            .map((author: Author) =>
              (author.isGivenSurName
                ? author.givenName + ' ' + author.surName
                : author.surName + ' ' + author.givenName
              ).toLowerCase()
            )
            .join(' ')
            .includes(searchTerms.toLowerCase()) ||
          book.isbn.toLowerCase().includes(searchTerms.toLowerCase()) ||
          book.description.toLowerCase().includes(searchTerms.toLowerCase())
        )
      })
    )
  }

  const handleSubmit = (values: { searchTerms: string }) => {
    setSearchParams(`value=${encodeURIComponent(values.searchTerms)}`)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Box>
      <Container size="md" my="xl">
        <Title order={1}>Search</Title>
        <Box my="xl">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              size="lg"
              placeholder="Search using book's name, authors, ISBNs, or description"
              {...form.getInputProps('searchTerms')}></TextInput>
            <Group position="right" my="md">
              <Button
                size={'md'}
                variant="white"
                onClick={() => {
                  setSearchParams('')
                  setSearchResults(books)
                  form.reset()
                }}>
                Reset
              </Button>
              <Button type="submit" size={'md'}>
                Search
              </Button>
            </Group>
          </form>
        </Box>
        <Divider my="md" />
        <Box my="xl">
          {searchResults.length !== 0 ? (
            <>
              {getSearchList(searchPage).map((book: Book) => (
                <SearchCard
                  key={book.id}
                  book={book}
                  actionButton={
                    <Group>
                      {currentUser && (
                        <Button
                          variant="outline"
                          disabled={
                            isBorrowing ||
                            currentUser.isBanned ||
                            currentLoans.filter((loan) => loan.bookId === book.id).length !== 0 ||
                            bookCopies.filter(
                              (copy: BookCopy) =>
                                copy.bookId === book.id && copy.status === 'AVAILABLE'
                            ).length === 0
                          }
                          onClick={async () => {
                            const availableBookCopy = bookCopies.find(
                              (copy: BookCopy) =>
                                copy.bookId === book.id && copy.status === 'AVAILABLE'
                            )
                            if (availableBookCopy) {
                              setIsBorrowing(true) // set borrowing state to true
                              await dispatch(borrowBookCopy(availableBookCopy.id))
                              await dispatch(fetchOwnUser()) // update user data
                              await dispatch(fetchBookCopies()) // update borrowed books data
                              setIsBorrowing(false) // set borrowing state to false
                            }
                          }}>
                          Borrow
                        </Button>
                      )}
                      <Button
                        leftIcon={<IconExternalLink size="1.2em" />}
                        onClick={() => navigate('/book/' + book.id)}>
                        More
                      </Button>
                    </Group>
                  }
                />
              ))}
              <Box mt="md">
                <Pagination
                  total={(searchResults.length - 1) / 5 + 1}
                  onChange={(value) => {
                    setSearchPage(value)
                  }}
                />
              </Box>
            </>
          ) : (
            <Title order={5}>No books found.</Title>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default Search
