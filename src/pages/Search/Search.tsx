import { Box, Button, Container, Divider, Group, Stack, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'
import SearchCard from '../../components/BookOverviewCard'
import { borrowBook } from '../../features/library/slice'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Search = () => {
  const query = useQuery()
  const books = useSelector((state: any) => state.library.books)
  const [searchResults, setSearchResults] = useState<any>(books)
  let [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const currentUser = useSelector((state: any) => state.users.currentUser)

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

  const handleSubmit = (values: { searchTerms: string }) => {
    console.log(values)
    setSearchParams(`value=${encodeURIComponent(values.searchTerms)}`)
    setSearchResults(
      books.filter((book: any) => {
        return (
          book.title.toLowerCase().includes(values.searchTerms.toLowerCase()) ||
          book.authors
            .map((author: any) => author.fullName)
            .join(', ')
            .toLowerCase()
            .includes(values.searchTerms.toLowerCase()) ||
          book.ISBN.toLowerCase().includes(values.searchTerms.toLowerCase()) ||
          book.description.toLowerCase().includes(values.searchTerms.toLowerCase())
        )
      })
    )
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
        <Divider variant={'dashed'} />
        <Box>
          <Title order={2} my="xs">
            Results:
          </Title>
          {searchResults.map((book: any) => (
            <SearchCard
              key={book.id}
              book={book}
              actionButton={
                <Group>
                  {currentUser && (
                    <Button
                      variant="outline"
                      disabled={
                        books
                          .find((b: any) => b.id === book.id)
                          .copies.find((copy: any) => copy.borrowerId === currentUser.id) !==
                          undefined ||
                        book.copies.find((copy: any) => copy.borrowerId === null) === undefined
                      }
                      onClick={() => {
                        dispatch(
                          borrowBook({
                            bookId: book.id,
                            borrowerId: currentUser.id,
                            borrowDate: '2021-11-11'
                          })
                        )
                      }}>
                      Borrow
                    </Button>
                  )}
                  <Button>More</Button>
                </Group>
              }
            />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Search
