import { Box, Button, Checkbox, Group, Select, Stack, Switch, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useSelector } from 'react-redux'
import { fetchUsers, updateUser } from '../../features/users/thunk'
import { RootState, useAppDispatch } from '../../store'
import { User } from '../../types'
import React from 'react'
import { fetchOwnUser } from '../../features/currentUser/thunk'

interface EditUserModalProps {
  user: User
  onFinish: () => void
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onFinish }) => {
  const userList = useSelector((state: RootState) => state.users.users)
  const dispatch = useAppDispatch()

  const form = useForm({
    initialValues: {
      id: user.id,
      givenName: user.givenName,
      surName: user.surName,
      isGivenSurName: user.isGivenSurName,
      email: user.email,
      imgsrc: user.imgsrc,
      role: user.role
    } as User,
    validate: {
      email: (val) => {
        if (!val || !/^\S+@\S+$/.test(val)) return 'Invalid email'
        if (userList.findIndex((user: User) => user.email === val) !== -1 && val !== user.email)
          return 'Email already exists'
        return null
      },
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

  const handleSubmit = async (values: User) => {
    const updatedUser: User = {
      ...values
    }
    await dispatch(updateUser(updatedUser))
    await dispatch(fetchOwnUser())
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
          <TextInput label="Email" placeholder="Email" required {...form.getInputProps('email')} />
          <TextInput label="Image URL" placeholder="Image URL" {...form.getInputProps('imgsrc')} />
          <Select
            data={['USER', 'STAFF', 'ADMIN', 'SUPERUSER']}
            label="Role"
            {...form.getInputProps('role')}
          />
          <Stack my="sm">
            <Switch
              label="Banned"
              {...form.getInputProps('isBanned')}
              checked={form.getInputProps('isBanned').value}
              color="red"
            />
          </Stack>
          <Group position="right">
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </Box>
  )
}

export default EditUserModal
