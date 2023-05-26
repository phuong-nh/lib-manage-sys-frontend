import React, { forwardRef } from 'react'
import { useForm } from '@mantine/form'
import {
  Button,
  TextInput,
  Textarea,
  NumberInput,
  MultiSelect,
  Box,
  Stack,
  Group,
  Avatar,
  Text,
  rem,
  CloseButton,
  MultiSelectValueProps
} from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'

import generateId from '../../utils/generateId'
import { addBook, updateBook } from '../../features/books/thunk'

import { Author, Book, BookCopy, Content } from '../../types'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Link, RichTextEditor } from '@mantine/tiptap'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { fetchContents } from '../../features/contents/thunk'

interface EditBookModalProps {
  onFinish: () => void
  book: Book
}

const SelectItem = forwardRef<HTMLDivElement, Author>((author: Author, ref) => (
  <div ref={ref} {...author}>
    <Group noWrap>
      <Avatar src={author.imgsrc} />

      <div>
        <Text>
          {author.isGivenSurName
            ? author.givenName + ' ' + author.surName
            : author.surName + ' ' + author.givenName}
        </Text>
        <Text size="xs" color="dimmed">
          ID: {author.id}
        </Text>
      </div>
    </Group>
  </div>
))

SelectItem.displayName = 'SelectItem'

function Value({
  surName,
  givenName,
  isGivenSurName,
  onRemove,
  ...others
}: MultiSelectValueProps & Author) {
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
        <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>
          {isGivenSurName ? givenName + ' ' + surName : surName + ' ' + givenName}
        </Box>
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

const EditBookModal: React.FC<EditBookModalProps> = ({ onFinish, book }) => {
  const authors = useSelector((state: RootState) => state.authors.authors)
  const authorsWithValue = authors.map((author: Author) => ({
    ...author,
    value: author.id
  }))
  const categories = useSelector((state: RootState) => state.categories.categories)
  const categoriesWithValue = categories.map((category) => ({
    label: category.name,
    value: category.id
  }))
  const books = useSelector((state: RootState) => state.books.books)

  const dispatch = useAppDispatch()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content: book.bookBio.content
  })

  const form = useForm({
    initialValues: {
      id: book.id,
      title: book.title,
      description: book.description,
      bookBio: {
        id: book.bookBio.id,
        title: book.bookBio.title,
        content: book.bookBio.content,
        contentType: 'BOOK_BIO',
        date: book.bookBio.date,
        authorId: book.bookBio.authorId
      },
      publisher: book.publisher,
      publishedDate: book.publishedDate,
      isbn: book.isbn,
      numberOfCopies: book.numberOfCopies,
      authorIds: book.authorIds,
      bookCopyIds: book.bookCopyIds,
      imgsrc: book.imgsrc,
      categoryIds: book.categoryIds
    } as Book,

    validate: {
      title: (value: string) => (value.trim().length > 0 ? null : 'Title is required'),
      description: (value: string) => (value.trim().length > 0 ? null : 'Description is required'),
      bookBio: (value: Content) =>
        value.content.trim().length > 0 ? null : 'Book bio is required',
      publisher: (value: string) => (value.trim().length > 0 ? null : 'Publisher is required'),
      publishedDate: (value: string) =>
        value.trim().length > 0 ? null : 'Published date is required',
      isbn: (value: string) =>
        value.trim().length > 0 &&
        (!books.find((book) => book.isbn === value) || value === book.isbn)
          ? null
          : 'ISBN is required/already exists',
      numberOfCopies: (value: number) =>
        value > 0 ? null : 'Number of copies must be greater than 0',
      authorIds: (value: string[]) => (value.length > 0 ? null : 'Author is required'),
      categoryIds: (value: string[]) => (value.length > 0 ? null : 'Category is required')
    }
  })

  const handleSubmit = async (values: Book) => {
    dispatch(
      updateBook({
        ...values,
        bookBio: {
          ...values.bookBio,
          title: 'Book Bio - ' + values.title,
          content: editor?.getHTML()
        }
      } as Book)
    )
    dispatch(fetchContents())
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
              (!selected && item.id.toLowerCase().includes(value.toLowerCase().trim())) ||
              (!selected && item.surName.toLowerCase().includes(value.toLowerCase().trim())) ||
              (!selected && item.givenName.toLowerCase().includes(value.toLowerCase().trim()))
            }
            label="Authors"
            placeholder="Select authors"
            required
            {...form.getInputProps('authorIds')}
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
            label="Number of Copies"
            placeholder="Enter number of copies"
            required
            {...form.getInputProps('numberOfCopies')}
          />
          <MultiSelect
            data={categoriesWithValue}
            label="Categories"
            placeholder="Select categories"
            {...form.getInputProps('categoryIds')}
            searchable
          />
          <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={50}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
          </RichTextEditor>
          <Group position="right">
            <Button onClick={onFinish}>Cancel</Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  )
}

export default EditBookModal
