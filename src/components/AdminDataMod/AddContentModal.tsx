import { Box, Button, Group, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDispatch } from 'react-redux'
import { RichTextEditor, Link } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'

import generateId from '../../utils/generateId'
import { Content } from '../../types'
import getCurrentDate from '../../utils/getCurrentDate'
import { addContent } from '../../features/content/slice'

interface AddContentModalProps {
  onFinish: () => void
}

function AddContentModal({ onFinish }: AddContentModalProps) {
  const dispatch = useDispatch()

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
    content: ''
  })

  const form = useForm({
    initialValues: {
      title: '',
      author: '',
      imageUrl: ''
    },

    validate: {
      title: (value: string) => !value && 'Title is required',
      author: (value: string) => !value && 'Author is required'
    }
  })

  const handleSubmit = (values: {
    title: string
    author: string
    imageUrl: string | undefined
  }) => {
    if (!editor || editor.getHTML().length < 10) {
      alert('Content is required')
      return
    } else {
      const newContent: Content = {
        id: generateId(values.title + values.author),
        title: values.title,
        author: values.author,
        content: editor.getHTML(),
        date: getCurrentDate(),
        type: 'news',
        showOnHomePage: true,
        imageUrl: values.imageUrl
      }
      dispatch(addContent(newContent))
      onFinish()
    }
  }

  return (
    <Box py="xl">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Title" placeholder="Title" required {...form.getInputProps('title')} />
          <TextInput
            label="Author"
            placeholder="Author"
            required
            {...form.getInputProps('author')}
          />
          <TextInput
            label="Image URL"
            placeholder="Image URL"
            {...form.getInputProps('imageUrl')}
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
            <Button type="submit">Add</Button>
          </Group>
        </Stack>
      </form>
    </Box>
  )
}

export default AddContentModal
