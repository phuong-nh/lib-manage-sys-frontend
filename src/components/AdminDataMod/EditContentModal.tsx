import { Box, Button, Checkbox, Group, Select, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDispatch, useSelector } from 'react-redux'
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
import { RootState, useAppDispatch } from '../../store'
import { addContent, fetchContents, updateContent } from '../../features/contents/thunk'
import React from 'react'

interface EditContentModalProps {
  content: Content
  onFinish: () => void
}

function EditContentModal({ onFinish, content }: EditContentModalProps) {
  const currentUser = useSelector((state: RootState) => state.currentUser.user)

  if (!currentUser) {
    throw new Error('Current User is not defined')
  }

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
    content: content.content
  })

  const form = useForm({
    initialValues: {
      title: content.title,
      imgsrc: content.imgsrc,
      contentType: content.contentType,
      showOnHomePage: content.showOnHomePage
    } as Content,
    validate: {
      title: (value: string) => !value && 'Title is required'
    }
  })

  const handleSubmit = async (values: Content) => {
    if (!editor || editor.getHTML().length < 10) {
      alert('Content is required')
      return
    } else {
      const newContent: Content = {
        ...values,
        date: '',
        id: content.id,
        content: editor.getHTML()
      }
      await dispatch(updateContent(newContent))
      await dispatch(fetchContents())
      onFinish()
    }
  }

  return (
    <Box py="xl">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Title" placeholder="Title" required {...form.getInputProps('title')} />
          <TextInput label="Image URL" placeholder="Image URL" {...form.getInputProps('imgsrc')} />

          <Select data={['NEWS', 'BLOG']} label="Type" {...form.getInputProps('contentType')} />

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

          <Checkbox label="Show on home page" {...form.getInputProps('showOnHomePage')} />

          <Group position="right">
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </Box>
  )
}

export default EditContentModal
