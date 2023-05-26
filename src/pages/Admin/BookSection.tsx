import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Stack,
  Group,
  TextInput,
  Button,
  ActionIcon,
  Pagination,
  Table,
  Title,
  Text
} from '@mantine/core'
import { IconEdit, IconX } from '@tabler/icons-react'
import { modals } from '@mantine/modals'

import { AddBookModal, EditBookModal } from '../../components/AdminDataMod'
import { Author, Book } from '../../types'
import { RootState, useAppDispatch } from '../../store'
import { fetchBooks, removeBook } from '../../features/books/thunk'
import { fetchContents } from '../../features/contents/thunk'

const BookSection = () => {
  const books = useSelector((state: RootState) => state.books.books)
  const authors = useSelector((state: RootState) => state.authors.authors)
  const [bookList, setBookList] = useState(books)
  const [bookPage, setBookPage] = useState(1)
  const dispatch = useAppDispatch()

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
                authors
                  .filter((author) => book.authorIds.includes(author.id))
                  .map((author: Author) =>
                    (author.isGivenSurName
                      ? author.givenName + ' ' + author.surName
                      : author.surName + ' ' + author.givenName
                    ).toLowerCase()
                  )
                  .join(' ')
                  .includes(e.currentTarget.value.toLowerCase()) ||
                book.isbn.toLowerCase().includes(e.currentTarget.value.toLowerCase()) ||
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
            {/*<th>Available</th>*/}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getBookList(bookPage).map((book: Book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>
                {book.authorIds
                  .map((authorId) => {
                    const author = authors.find((author: Author) => author.id === authorId)
                    if (!author) return ''
                    return author.isGivenSurName
                      ? author.givenName + ' ' + author.surName
                      : author.surName + ' ' + author.givenName
                  })
                  .join(', ')}
              </td>
              <td>{book.isbn}</td>
              <td>{book.publishedDate}</td>
              {/*<td>*/}
              {/*  {book.copies.filter((copy) => copy.status === 'available').length}/*/}
              {/*  {book.copies.length}*/}
              {/*</td>*/}
              <td width={'1em'}>
                <ActionIcon
                  onClick={() => {
                    modals.open({
                      title: <Text fw={700}>Edit Book</Text>,
                      children: <EditBookModal onFinish={modals.closeAll} book={book} />,
                      size: 'xl'
                    })
                  }}>
                  <IconEdit />
                </ActionIcon>
              </td>
              <td width={'1em'}>
                <ActionIcon
                  onClick={async () => {
                    await dispatch(removeBook(book.id))
                    await dispatch(fetchBooks())
                    await dispatch(fetchContents())
                  }}>
                  <IconX />
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
              children: <AddBookModal onFinish={modals.closeAll} />,
              size: 'xl'
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
