import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Author, Book } from '../../types'
import { useForm } from '@mantine/form'
import {
  Box,
  Checkbox,
  Stack,
  Group,
  TextInput,
  Button,
  Switch,
  ActionIcon,
  Pagination,
  Table,
  Title,
  Text
} from '@mantine/core'
import { IconEdit } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { AddBookModal, EditBookModal } from '../../components/AdminDataMod'

const BookSection = () => {
  const books = useSelector((state: any) => state.library.books)
  const [bookList, setBookList] = useState(books)
  const [bookPage, setBookPage] = useState(1)

  useEffect(() => {
    setBookList(books)
  }, [books])

  const getBookList = (page: number) => {
    if (page === (bookList.length - 1) / 5 + 1)
      return bookList.slice((page - 1) * 5, bookList.length)
    return bookList.slice((page - 1) * 5, page * 5)
  }

  return (
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
            <th>Published</th>
            <th>Available</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getBookList(bookPage).map((book: Book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.authors.map((author: Author) => author.fullName).join(', ')}</td>
              <td>{book.ISBN}</td>
              <td>{book.publishedDate}</td>
              <td>
                {book.copies.filter((copy) => copy.status === 'available').length}/
                {book.copies.length}
              </td>
              <td width={'1em'}>
                <ActionIcon
                  onClick={() => {
                    modals.open({
                      title: <Text fw={700}>Edit Book</Text>,
                      children: <EditBookModal onFinish={modals.closeAll} book={book}/>
                    })
                  }}>
                  <IconEdit />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Group position="apart">
        <Button
          onClick={() => {
            modals.open({
              title: <Text fw={700}>Add Book</Text>,
              children: <AddBookModal onFinish={modals.closeAll} />
            })
          }}>
          Add Book
        </Button>
        <Pagination
          total={(bookList.length - 1) / 5 + 1}
          onChange={(value) => {
            setBookPage(value)
          }}
        />
      </Group>
    </Stack>
  )
}

export default BookSection
