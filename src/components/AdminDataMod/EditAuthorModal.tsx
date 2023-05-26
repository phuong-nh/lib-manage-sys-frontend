import { Box, Button, Checkbox, Group, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { useAppDispatch } from '../../store'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Link, RichTextEditor } from '@mantine/tiptap'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'

import { Author } from '../../types'
import { addAuthor, fetchAuthors, updateAuthor } from '../../features/authors/thunk'
import { fetchContents } from '../../features/contents/thunk'

interface EditAuthorModalProps {
  onFinish: () => void
  author: Author
}

const EditAuthorModal: React.FC<EditAuthorModalProps> = ({ author, onFinish }) => {
  const [isFullNameEditable, setIsFullNameEditable] = useState(true)
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
    content: author.authorBio.content
  })

  const form = useForm({
    initialValues: {
      id: author.id,
      givenName: author.givenName,
      surName: author.surName,
      imgsrc: author.imgsrc,
      isGivenSurName: author.isGivenSurName,
      authorBio: author.authorBio
    },
    validate: {
      imgsrc: (val) => {
        if (val && !val.startsWith('http')) return 'Image URL must start with http'
        return null
      },
      givenName: (val) => {
        if (!val) return 'Given name is required'
        return null
      },
      surName: (val) => {
        if (!val) return 'Surname is required'
        return null
      }
    }
  })

  const handleSubmit = async (values: Author) => {
    const updatedAuthor: Author = {
      ...values,
      authorBio: {
        ...values.authorBio,
        id: author.authorBio.id,
        title:
          'Author Bio - ' +
          (values.isGivenSurName ? values.givenName : values.surName) +
          ' ' +
          (values.isGivenSurName ? values.surName : values.givenName),
        content: editor?.getHTML() || ''
      }
    }
    await dispatch(updateAuthor(updatedAuthor))
    await dispatch(fetchAuthors())
    await dispatch(fetchContents())
    onFinish()
  }

  return (
    <Box py="xl">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Group grow>
            <TextInput
              label="Given name"
              placeholder="Given name"
              required
              {...form.getInputProps('givenName')}
            />
            <TextInput
              label="Surname"
              placeholder="Surname"
              required
              {...form.getInputProps('surName')}
            />
          </Group>
          <TextInput label="Image URL" placeholder="Image URL" {...form.getInputProps('imgsrc')} />
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
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </Box>
  )
}

export default EditAuthorModal
