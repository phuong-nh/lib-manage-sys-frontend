import {
  ActionIcon,
  Box,
  Button,
  Container,
  Divider,
  Group,
  Modal,
  Pagination,
  Stack,
  Table,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { useSelector } from 'react-redux'
import { Author, Book, User } from '../../types'
import { IconEdit, IconPlus } from '@tabler/icons-react'
import { useDisclosure, usePagination } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { AddUserModal } from '../../components/AdminDataMod'
import UserSection from './UserSection'
import BookSection from './BookSection'

const Admin = () => {
  const users = useSelector((state: any) => state.users.users)
  const books = useSelector((state: any) => state.library.books)
  const authors = useSelector((state: any) => state.library.authors)
  const [userList, setUserList] = useState(users)
  const [bookList, setBookList] = useState(books)
  const [authorList, setAuthorList] = useState(authors)
  const [userPage, setUserPage] = useState(1)
  const [bookPage, setBookPage] = useState(1)
  const [authorPage, setAuthorPage] = useState(1)
  const [addUserModalOpened, addUserModalMethods] = useDisclosure(false)
  const [addBookModalOpened, addBookModalMethods] = useDisclosure(false)
  const [addAuthorModalOpened, addAuthorModalMethods] = useDisclosure(false)

  useEffect(() => {
    setUserList(users)
  }, [users])

  useEffect(() => {
    setBookList(books)
  }, [books])

  useEffect(() => {
    setAuthorList(authors)
  }, [authors])

  const getBookList = (page: number) => {
    if (page === (bookList.length - 1) / 5 + 1)
      return bookList.slice((page - 1) * 5, bookList.length)
    return bookList.slice((page - 1) * 5, page * 5)
  }

  const getAuthorList = (page: number) => {
    if (page === (authorList.length - 1) / 5 + 1)
      return authorList.slice((page - 1) * 5, authorList.length)
    return authorList.slice((page - 1) * 5, page * 5)
  }

  return (
    <Box>
      <Container size="lg" my="xl">
        <Title order={1}>Admin</Title>
        <Group>
          <Text>Manage user accounts and books here:</Text>
        </Group>

        <UserSection />

        <Divider />
        
        <BookSection />

        <Divider />
        <Stack my="xl">
          <Title order={2}>Author</Title>
          <TextInput
            placeholder="Search authors"
            onChange={(e) => {
              setAuthorList(
                authors.filter((author: Author) => {
                  return author.fullName.toLowerCase().includes(e.currentTarget.value.toLowerCase())
                })
              )
            }}
          />
          <Table withBorder>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {getAuthorList(authorPage).map((author: Author) => (
                <tr key={author.id}>
                  <td>{author.givenName}</td>
                  <td>{author.surName}</td>
                  <td width={'1em'}>
                    <ActionIcon>
                      <IconEdit />
                    </ActionIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Group position="right">
            <Pagination
              total={(authorList.length - 1) / 5 + 1}
              onChange={(value) => {
                setAuthorPage(value)
              }}
            />
          </Group>
        </Stack>
      </Container>
    </Box>
  )
}

export default Admin
