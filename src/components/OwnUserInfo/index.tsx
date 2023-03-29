import { Box, Button, Checkbox, Group, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { logout, updateUser } from '../../features/users/slice'
import { RootState } from '../../store'
import { User } from '../../types'

interface OwnUserInfoProps {
  user: User
  disabled?: boolean
}

const UserInfo: React.FC<OwnUserInfoProps> = ({ user }) => {
  const [isFullNameEditable, setIsFullNameEditable] = useState(true)
  const userList = useSelector((state: RootState) => state.users.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      givenName: user.givenName,
      surName: user.surName,
      fullName: user.fullName,
      email: user.email,
      imgsrc: user.imgsrc
    },
    validate: {
      fullName: (value) => {
        if (!value && isFullNameEditable) return 'Full name is required'
        if (value && value.split(' ').length < 2) return 'Full name must contain given and surname'
      },
      email: (val) => {
        if (/^\S+@\S+$/.test(val) == false) return 'Invalid email'
        if (userList.findIndex((user: User) => user.email === val) !== -1 && val !== user.email)
          return 'Email already exists'
        return null
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
  }) => {
    if (isFullNameEditable && values.fullName) {
      values.givenName = values.fullName.split(' ')[0]
      values.surName = values.fullName.split(' ').slice(1).join(' ')
    } else {
      values.fullName = `${values.givenName} ${values.surName}`
    }
    const updatedUser = {
      ...user,
      givenName: values.givenName,
      surName: values.surName,
      fullName: values.fullName
    }
    dispatch(updateUser(updatedUser))
  }

  return (
    <Box py="xl">
      <Group position="right">
        <Button
          color="red"
          onClick={() => {
            dispatch(logout())
            navigate('/')
          }}>
          Log out
        </Button>
      </Group>
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
          <TextInput label="Email" placeholder="Email" required {...form.getInputProps('email')} />
          <TextInput label="Image URL" placeholder="Image URL" {...form.getInputProps('imgsrc')} />
          <Group position="right">
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </Box>
  )
}

export default UserInfo
