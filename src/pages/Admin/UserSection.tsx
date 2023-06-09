import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { modals } from '@mantine/modals'
import {
  Stack,
  Group,
  TextInput,
  Button,
  Title,
  Table,
  ActionIcon,
  Pagination,
  Text
} from '@mantine/core'
import { IconEdit, IconX } from '@tabler/icons-react'

import { EditUserModal } from '../../components/AdminDataMod'
import { fetchUsers, removeUser } from '../../features/users/thunk'
import { User } from '../../types'
import { RootState, useAppDispatch } from '../../store'
import { fetchOwnUser } from '../../features/currentUser/thunk'

const UserSection = () => {
  const users = useSelector((state: RootState) => state.users.users)
  const [userList, setUserList] = useState(users)
  const [userPage, setUserPage] = useState(1)
  const dispatch = useAppDispatch()

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
              if (!user.email) throw new Error('User email is undefined')
              return (
                (user.isGivenSurName
                  ? user.givenName + ' ' + user.surName
                  : user.surName + ' ' + user.givenName
                )
                  .toLowerCase()
                  .includes(e.currentTarget.value.toLowerCase()) ||
                user.email.toLowerCase().includes(e.currentTarget.value.toLowerCase())
              )
            })
          )
        }}
      />
      <Table withBorder>
        <thead>
          <tr>
            <th>Given Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getUserList(userPage).map((user: User) => (
            <tr key={user.id}>
              <td>{user.givenName}</td>
              <td>{user.surName}</td>
              <td>{user.email}</td>
              <td>
                {user.isBanned ? <Text color="red">{user.role}</Text> : <Text>{user.role}</Text>}
              </td>
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
              <td width={'1em'}>
                <ActionIcon
                  onClick={async () => {
                    await dispatch(removeUser(user.id))
                    await dispatch(fetchUsers())
                    await dispatch(fetchOwnUser())
                  }}>
                  <IconX />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Group position="apart">
        <Button
          disabled
          onClick={() => {
            // modals.open({
            //   title: <Text fw={700}>Add User</Text>,
            //   children: <AddUserModal onFinish={modals.closeAll} />
            // })
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
