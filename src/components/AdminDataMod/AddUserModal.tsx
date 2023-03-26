import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { User } from '../../types'
import { useForm } from '@mantine/form'
import { Box, Checkbox, Stack, Group, TextInput, Button, Switch } from '@mantine/core'
import generateId from '../../utils/generateId'
import { addUser } from '../../features/users/slice'
import { Navigate } from 'react-router'

const addUserModal = () => {
  const [isFullNameEditable, setIsFullNameEditable] = useState(true)
  const [isDone, setIsDone] = useState(false)
  const userList = useSelector((state: any) => state.users.users)
  const dispatch = useDispatch()

  const form = useForm({
    initialValues: {
      givenName: '',
      surName: '',
      fullName: '',
      email: '',
      imgsrc: '',
      isAdmin: false
    },
    validate: {
      fullName: (value) => {
        if (!value && isFullNameEditable) return 'Full name is required'
        if (value && value.split(' ').length < 2) return 'Full name must contain given and surname'
      },
      email: (val) => {
        if (/^\S+@\S+$/.test(val) == false) return 'Invalid email'
        if (userList.findIndex((user: User) => user.email === val) !== -1)
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

  const handleSubmit = (values: any) => {
    if (isFullNameEditable) {
      values.givenName = values.fullName.split(' ')[0]
      values.surName = values.fullName.split(' ').slice(1).join(' ')
    } else {
      values.fullName = `${values.givenName} ${values.surName}`
    }
    const newUser: User = {
      id: generateId(values.email),
      givenName: values.givenName,
      surName: values.surName,
      fullName: values.fullName,
      email: values.email,
      imgsrc: values.imgsrc,
      role: values.isAdmin ? 'admin' : 'user'
    }
    dispatch(addUser(newUser))
    setIsDone(true)
  }

  return (
    <Box py="xl">
      {isDone && <Navigate to="/admin" replace/>}
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
          <Switch label="Admin" my="sm" {...form.getInputProps('isAdmin')} />
          <Group position="right">
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </Box>
  )
}

export default addUserModal
