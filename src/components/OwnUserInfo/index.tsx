import { Box, Button, Checkbox, Group, Stack, TextInput } from '@mantine/core'

import { User } from '../../types'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router'
import { updateUser } from '../../features/users/thunk'
import { fetchOwnUser, logoutUser } from '../../features/currentUser/thunk'

interface OwnUserInfoProps {
  user: User
  disabled?: boolean
  onFinish?: () => void
}

const UserInfo: React.FC<OwnUserInfoProps> = ({ user, onFinish }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      givenName: user.givenName,
      surName: user.surName,
      isGivenSurName: user.isGivenSurName,
      email: user.email,
      imgsrc: user.imgsrc
    },
    validate: {
      givenName: (value) =>
        value.trim().length > 0 && value.trim().length < 50 ? null : 'Invalid name',
      surName: (value) =>
        value.trim().length > 0 && value.trim().length < 50 ? null : 'Invalid name'
    }
  })

  const handleSubmit = async (formValues: typeof form.values) => {
    try {
      const updatedUser: User = {
        ...formValues,
        id: user.id,
        role: user.role
      }
      await dispatch(updateUser(updatedUser))
      await dispatch(fetchOwnUser())
    } catch (error) {
      console.log(error)
    }
    if (onFinish) onFinish()
  }

  return (
    <Box py="xl">
      <Group position="right">
        <Button
          color="red"
          variant="outline"
          onClick={() => {
            dispatch(logoutUser())
            navigate('/')
          }}>
          Log out
        </Button>
      </Group>
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
          <TextInput
            disabled
            label="Email"
            placeholder="Email"
            required
            {...form.getInputProps('email')}
          />
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
