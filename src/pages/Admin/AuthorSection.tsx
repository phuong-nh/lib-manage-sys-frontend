import {
  ActionIcon,
  Button,
  Group,
  Pagination,
  Stack,
  Table,
  TextInput,
  Title,
  Text
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconEdit, IconX } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AddAuthorModal, EditAuthorModal } from '../../components/AdminDataMod'
import { removeAuthor } from '../../features/library/slice'
import { Author } from '../../types'

const AuthorSection = () => {
  const authors = useSelector((state: any) => state.library.authors)
  const [authorList, setAuthorList] = useState(authors)
  const [authorPage, setAuthorPage] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    setAuthorList(authors)
  }, [authors])

  const getAuthorList = (page: number) => {
    if (page === (authorList.length - 1) / 5 + 1)
      return authorList.slice((page - 1) * 5, authorList.length)
    return authorList.slice((page - 1) * 5, page * 5)
  }

  return (
    <Stack my="xl">
      <Title order={2}>Author</Title>
      <TextInput
        placeholder="Search authors"
        onChange={(e) => {
          setAuthorList(
            authors.filter((author: Author) => {
              return author.fullName.toLowerCase().includes(e.currentTarget.value.toLowerCase())
            })
          )
        }}
      />
      <Table withBorder>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getAuthorList(authorPage).map((author: Author) => (
            <tr key={author.id}>
              <td>{author.givenName}</td>
              <td>{author.surName}</td>
              <td width={'1em'}>
                <ActionIcon
                  onClick={() => {
                    modals.open({
                      title: <Text fw={700}>Edit Author</Text>,
                      children: <EditAuthorModal onFinish={modals.closeAll} author={author} />
                    })
                  }}>
                  <IconEdit />
                </ActionIcon>
              </td>
              <td width={'1em'}>
                <ActionIcon
                  onClick={() => {
                    dispatch(removeAuthor(author.id))
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
          onClick={() => {
            modals.open({
              title: <Text fw={700}>Add Author</Text>,
              children: <AddAuthorModal onFinish={modals.closeAll} />
            })
          }}>
          Add Author
        </Button>
        <Pagination
          total={(authorList.length - 1) / 5 + 1}
          onChange={(value) => {
            setAuthorPage(value)
          }}
        />
      </Group>
    </Stack>
  )
}

export default AuthorSection
