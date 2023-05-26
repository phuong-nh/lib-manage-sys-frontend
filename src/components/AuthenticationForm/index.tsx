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
import { loginUser, registerUser } from '../../features/currentUser/thunk'
import { useAppDispatch } from '../../store'

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register'])
  const dispatch = useAppDispatch()

  const form = useForm({
    initialValues: {
      givenName: '',
      surName: '',
      isGivenSurName: true,
      email: '',
      password: '',
      terms: false
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length >= 8 ? null : 'Password should include at least 8 characters',
      terms: (value) => (value || type === 'login' ? null : 'You must accept terms and conditions'),
      givenName: (value) => (value || type === 'login' ? null : 'Given name is required'),
      surName: (value) => (value || type === 'login' ? null : 'Surname is required'),
      isGivenSurName: (value) => (value || type === 'login' ? null : 'This field is required')
    }
  })

  const handleLogin = (values: { email: string; password: string }) => {
    dispatch(loginUser(values))
  }

  const handleRegister = (values: {
    givenName: string
    surName: string
    email: string
    password: string
    isGivenSurName: boolean
  }) => {
    dispatch(registerUser(values))
  }

  const handleSubmit = (values: {
    givenName: string
    surName: string
    email: string
    password: string
    isGivenSurName: boolean
  }) => {
    if (type === 'login') {
      handleLogin(values)
    } else {
      handleRegister(values)
    }
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Library Management System
      </Text>

      <Divider label="Login or Register" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {type === 'register' && (
            <TextInput
              required
              label="Given name"
              value={form.values.givenName}
              onChange={(event) => form.setFieldValue('givenName', event.currentTarget.value)}
              radius="md"
            />
          )}

          {type === 'register' && (
            <TextInput
              required
              label="Surname"
              value={form.values.surName}
              onChange={(event) => form.setFieldValue('surName', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password}
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
