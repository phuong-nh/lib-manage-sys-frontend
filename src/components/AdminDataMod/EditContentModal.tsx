import { Box, Button, Group, Stack, Switch, TextInput } from '@mantine/core'
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

import { Content } from '../../types'
import { updateContent } from '../../features/content/slice'

interface EditContentModalProps {
  onFinish: () => void
  content: Content
}

function EditContentModal({ onFinish, content }: EditContentModalProps) {
  const dispatch = useDispatch()
  const defaultShowOnHomePage = content.showOnHomePage ? content.showOnHomePage : false

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
    content: content.content
  })

  const form = useForm({
    initialValues: {
      title: content.title,
      author: content.author,
      showOnHomePage: defaultShowOnHomePage,
      imageUrl: content.imageUrl
    },

    validate: {
      title: (value: string) => !value && 'Title is required',
      author: (value: string) => !value && 'Author is required'
    }
  })

  const handleSubmit = (values: {
    title: string
    author: string
    showOnHomePage: boolean
    imageUrl: string | undefined
  }) => {
    if (!editor || editor.getHTML().length < 10) {
      alert('Content is required')
      return
    } else {
      const updatedContent: Content = {
        id: content.id,
        title: values.title,
        author: values.author,
        content: editor.getHTML(),
        date: content.date,
        type: 'news',
        showOnHomePage: values.showOnHomePage,
        imageUrl: values.imageUrl
      }
      // console.log(values)
      dispatch(updateContent(updatedContent))
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
          <Switch
            label="Show on home page"
            {...form.getInputProps('showOnHomePage')}
            checked={form.getInputProps('showOnHomePage').value}
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
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </Box>
  )
}

export default EditContentModal
