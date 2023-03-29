import { Box, Button, Checkbox, Group, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Author } from '../../types'

interface EditAuthorModalProps {
  onFinish: () => void
  author: Author
}

const EditAuthorModal: React.FC<EditAuthorModalProps> = ({ author, onFinish }) => {
  const [isFullNameEditable, setIsFullNameEditable] = useState(true)
  const dispatch = useDispatch()

  const form = useForm({
    initialValues: {
      givenName: author.givenName,
      surName: author.surName,
      fullName: author.fullName,
      imgsrc: author.imgsrc
    },
    validate: {
      fullName: (value) => {
        if (!value && isFullNameEditable) return 'Full name is required'
        if (value && value.split(' ').length < 2) return 'Full name must contain given and surname'
      },
      imgsrc: (val) => {
        if (val && !val.startsWith('http')) return 'Image URL must start with http'
        return null
      },
      givenName: (val) => {
        if (!val && !isFullNameEditable) return 'Given name is required'
        return null
      },
      surName: (val) => {
        if (!val && !isFullNameEditable) return 'Surname is required'
        return null
      }
    }
  })

  const handleSubmit = (values: {
    givenName: string | null
    fullName: string | null
    surName: string | null
    imgsrc: string | null
  }) => {
    if (isFullNameEditable && values.fullName) {
      values.givenName = values.fullName.split(' ')[0]
      values.surName = values.fullName.split(' ').slice(1).join(' ')
    } else {
      values.fullName = `${values.givenName} ${values.surName}`
    }
    dispatch({
      type: 'library/updateAuthor',
      payload: {
        id: author.id,
        givenName: values.givenName,
        surName: values.surName,
        fullName: values.fullName,
        imgsrc: values.imgsrc
      }
    })
    onFinish()
  }

  return (
    <Box py="xl">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Checkbox
            label="Use full name"
            checked={isFullNameEditable}
            onChange={() => setIsFullNameEditable(!isFullNameEditable)}
          />
          <Group grow>
            {isFullNameEditable ? (
              <>
                <TextInput
                  label="Full name"
                  placeholder="Full name"
                  required
                  {...form.getInputProps('fullName')}
                />
              </>
            ) : (
              <>
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
              </>
            )}
          </Group>
          <TextInput label="Image URL" placeholder="Image URL" {...form.getInputProps('imgsrc')} />
          <Group position="right">
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </Box>
  )
}

export default EditAuthorModal
