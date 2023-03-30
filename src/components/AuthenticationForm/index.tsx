import { useToggle, upperFirst } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack
} from '@mantine/core'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'

import { User } from '../../types'
import { addUser, setCurrentUser } from '../../features/users/slice'
import hashCode from '../../utils/hashcode'
import { RootState } from '../../store'

export function AuthenticationForm(props: PaperProps) {
  const userList = useSelector((state: RootState) => state.users.users)
  const dispatch = useDispatch()

  const [type, toggle] = useToggle(['login', 'register'])
  const form = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      terms: true
    },

    validate: {
      email: (val) => {
        if (/^\S+@\S+$/.test(val) == false) return 'Invalid email'
        if (userList.findIndex((user: User) => user.email === val) !== -1)
          return 'Email already exists'
        return null
      },
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null)
    }
  })

  const handleSuccess = (response: CredentialResponse) => {
    const d = new Date()
    const time = d.getTime()
    if (response.credential === undefined) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userObj: any = jwt_decode(response.credential)
    if (userList.findIndex((user: User) => user.email === userObj.email) === -1) {
      const user: User = {
        id: hashCode(userObj.email + time.toString()).toString(),
        email: userObj.email,
        givenName: userObj.given_name,
        surName: userObj.family_name,
        fullName: userObj.name,
        imgsrc: userObj.picture,
        role: 'user'
      }
      dispatch(addUser(user))
      dispatch(setCurrentUser(user))
    } else {
      const user = userList.find((user: User) => user.email === userObj.email)
      if (user) dispatch(setCurrentUser(user))
    }
  }

  const handleFailure = () => {
    console.log('Uh-oh')
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Library Management System
      </Text>

      <Divider label="Continue with Google" labelPosition="center" my="lg" />

      <Group sx={{ display: 'flex', justifyContent: 'center', width: '100%', py: '1rem' }}>
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit(() => {
          console.log(form.values)
        })}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="First name"
              value={form.values.firstName}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          {type === 'register' && (
            <TextInput
              label="Last name"
              value={form.values.lastName}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
