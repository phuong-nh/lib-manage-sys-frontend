import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { User } from '../../types'
import { useForm } from '@mantine/form'
import {
  Box,
  Checkbox,
  Stack,
  Group,
  TextInput,
  Button,
  Switch,
  Title,
  Table,
  ActionIcon,
  Pagination,
  Text
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEdit } from '@tabler/icons-react'
import { AddUserModal, EditUserModal } from '../../components/AdminDataMod'
import { modals } from '@mantine/modals'

const UserSection = () => {
  const users = useSelector((state: any) => state.users.users)
  const [userList, setUserList] = useState(users)
  const [userPage, setUserPage] = useState(1)

  useEffect(() => {
    setUserList(users)
  }, [users])

  const getUserList = (page: number) => {
    if (page === (userList.length - 1) / 5 + 1)
      return userList.slice((page - 1) * 5, userList.length)
    return userList.slice((page - 1) * 5, page * 5)
  }

  return (
    <Stack my="xl">
      <Title order={2}>Users</Title>
      <TextInput
        placeholder="Search users"
        onChange={(e) => {
          setUserList(
            users.filter((user: User) => {
              return (
                user.fullName.toLowerCase().includes(e.currentTarget.value.toLowerCase()) ||
                user.email.toLowerCase().includes(e.currentTarget.value.toLowerCase())
              )
            })
          )
        }}
      />
      <Table withBorder>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getUserList(userPage).map((user: User) => (
            <tr key={user.id}>
              <td>{user.givenName}</td>
              <td>{user.surName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td width={'1em'}>
                <ActionIcon
                  onClick={() => {
                    modals.open({
                      title: <Text fw={700}>Edit User</Text>,
                      children: <EditUserModal onFinish={modals.closeAll} user={user} />
                    })
                  }}>
                  <IconEdit />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Group position="apart">
        <Button
          onClick={() => {
            modals.open({
              title: <Text fw={700}>Add User</Text>,
              children: <AddUserModal onFinish={modals.closeAll} />
            })
          }}>
          Add User
        </Button>
        <Pagination
          total={(userList.length - 1) / 5 + 1}
          onChange={(value) => {
            setUserPage(value)
          }}
        />
      </Group>
    </Stack>
  )
}

export default UserSection