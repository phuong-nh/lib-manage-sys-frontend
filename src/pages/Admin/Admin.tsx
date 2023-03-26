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
import { useState } from 'react'
import { AddUserModal } from '../../components/AdminDataMod'

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

  const getUserList = (page: number) => {
    if (page === (userList.length - 1) / 5 + 1)
      return userList.slice((page - 1) * 5, userList.length)
    return userList.slice((page - 1) * 5, page * 5)
  }

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
      <Modal onClose={
        () => {
          addUserModalMethods.close()
          
        }
      } opened={addUserModalOpened} title=" ">
        <AddUserModal/>
      </Modal>

      <Container size="lg" my="xl">
        <Title order={1}>Admin</Title>
        <Group>
          <Text>Manage user accounts and books here:</Text>
        </Group>

        <Stack my="xl">
          <Title order={2}>Users</Title>
          <TextInput
            placeholder="Search users"
            onChange={(e) => {
              setUserList(
                users.filter((user: User) => {
                  return (
                    user.fullName.toLowerCase().includes(e.currentTarget.value.toLowerCase()) ||
                    user.email.toLowerCase().includes(e.currentTarget.value.toLowerCase())
                  )
                })
              )
            }}
          />
          <Table withBorder>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {getUserList(userPage).map((user: User) => (
                <tr key={user.id}>
                  <td>{user.givenName}</td>
                  <td>{user.surName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td width={'1em'}>
                    <ActionIcon>
                      <IconEdit />
                    </ActionIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Group position="apart">
            <Button onClick={addUserModalMethods.open}>Add User</Button>
            <Pagination
              total={(userList.length - 1) / 5 + 1}
              onChange={(value) => {
                setUserPage(value)
              }}
            />
          </Group>
        </Stack>

        <Divider />
        <Stack my="xl">
          <Title order={2}>Books</Title>
          <TextInput
            placeholder="Search books"
            onChange={(e) => {
              setBookList(
                books.filter((book: Book) => {
                  return (
                    book.title.toLowerCase().includes(e.currentTarget.value.toLowerCase()) ||
                    book.authors
                      .map((author: Author) => author.fullName)
                      .join(', ')
                      .toLowerCase()
                      .includes(e.currentTarget.value.toLowerCase()) ||
                    book.ISBN.toLowerCase().includes(e.currentTarget.value.toLowerCase()) ||
                    book.publishedDate.toLowerCase().includes(e.currentTarget.value.toLowerCase())
                  )
                })
              )
            }}
          />
          <Table withBorder>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Year</th>
                <th>Available</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {getBookList(bookPage).map((book: Book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.authors.map((author: Author) => author.fullName)}</td>
                  <td>{book.ISBN}</td>
                  <td>{book.publishedDate}</td>
                  <td>
                    {book.copies.filter((copy) => copy.status === 'available').length}/
                    {book.copies.length}
                  </td>
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
              total={(bookList.length - 1) / 5 + 1}
              onChange={(value) => {
                setBookPage(value)
              }}
            />
          </Group>
        </Stack>

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
