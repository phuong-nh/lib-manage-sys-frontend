import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Author, Book, BookCopy, User } from '../../types'
import { useForm } from '@mantine/form'
import {
  Box,
  Stack,
  Group,
  TextInput,
  Button,
  Textarea,
  NumberInput,
  MultiSelect,
  Text,
  Avatar,
  MultiSelectValueProps,
  CloseButton,
  rem
} from '@mantine/core'
import generateId from '../../utils/generateId'

interface AddBookModalProps {
  onFinish: () => void
}

const SelectItem = forwardRef<HTMLDivElement, Author>(
  ({ imgsrc, fullName, id, ...others }: Author, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={imgsrc} />

        <div>
          <Text>{fullName}</Text>
          <Text size="xs" color="dimmed">
            ID: {id}
          </Text>
        </div>
      </Group>
    </div>
  )
)

function Value({ fullName, onRemove, ...others }: MultiSelectValueProps & Author) {
  return (
    <div {...others}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          cursor: 'default',
          alignItems: 'center',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          border: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4]
          }`,
          paddingLeft: theme.spacing.xs,
          borderRadius: theme.radius.sm
        })}>
        <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{fullName}</Box>
        <CloseButton
          onMouseDown={onRemove}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  )
}

const AddBookModal: React.FC<AddBookModalProps> = ({ onFinish }) => {
  const books = useSelector((state: any) => state.library.books)
  const authors = useSelector((state: any) => state.library.authors)
  const authorsWithValue = authors.map((author: Author) => ({
    ...author,
    value: author.id
  }))
  const dispatch = useDispatch()

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      publisher: '',
      publishedDate: '',
      isbn: '',
      copies: 0,
      authors: [],
      imgsrc: ''
    },

    validate: {
      title: (value) => !value && 'Title is required',
      description: (value) => !value && 'Description is required',
      publisher: (value) => !value && 'Publisher is required',
      publishedDate: (value) => !value && 'Published date is required',
      isbn: (value) => !value && 'ISBN is required',
      copies: (value) => !value && 'Copies is required',
      authors: (value) => !value && 'Authors is required'
    }
  })

  const handleSubmit = (values: any) => {
    let copiesArr: BookCopy[] = []
    for (let i = 0; i < values.copies; i++) {
      copiesArr.push({
        id: generateId(books + i.toString()),
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      })
    }

    const newBook: Book = {
      id: generateId(books),
      title: values.title,
      description: values.description,
      publisher: values.publisher,
      publishedDate: values.publishedDate,
      ISBN: values.isbn,
      copies: copiesArr,
      authors: values.authors.map((authorId: string) =>
        authors.find((author: Author) => author.id === authorId)
      ),
      imgsrc: values.imgsrc
    }
    dispatch({ type: 'library/addBook', payload: newBook })
    onFinish()
  }

  return (
    <Box py="xl">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Title"
            placeholder="Enter title"
            required
            {...form.getInputProps('title')}
          />
          <Textarea
            label="Description"
            placeholder="Enter description"
            required
            {...form.getInputProps('description')}
          />
          <MultiSelect
            data={authorsWithValue}
            itemComponent={SelectItem}
            valueComponent={Value}
            filter={(value, selected, item) =>
              !selected &&
              (item.fullName.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.id.toLowerCase().includes(value.toLowerCase().trim()))
            }
            label="Authors"
            placeholder="Select authors"
            required
            {...form.getInputProps('authors')}
            searchable
          />
          <TextInput
            label="Image URL"
            placeholder="Enter image URL"
            {...form.getInputProps('imgsrc')}
          />
          <TextInput
            label="Publisher"
            placeholder="Enter publisher"
            required
            {...form.getInputProps('publisher')}
          />
          <TextInput
            label="Published Date (YYYY-MM-DD)"
            placeholder="Enter published date"
            required
            {...form.getInputProps('publishedDate')}
          />
          <TextInput
            label="ISBN"
            placeholder="Enter ISBN"
            required
            {...form.getInputProps('isbn')}
          />
          <NumberInput
            label="Copies"
            placeholder="Enter number of copies"
            required
            {...form.getInputProps('copies')}
          />
          <Group position="right">
            <Button type="submit">Add</Button>
          </Group>
        </Stack>
      </form>
    </Box>
  )
}

export default AddBookModal
