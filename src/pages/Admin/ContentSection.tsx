import {
  ActionIcon,
  Button,
  Group,
  Pagination,
  Stack,
  Table,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconEdit, IconX } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddContentModal, EditContentModal } from '../../components/AdminDataMod'

import { removeContent } from '../../features/content/slice'
import { RootState } from '../../store'
import { Content } from '../../types'

function ContentSection() {
  const contents = useSelector((state: RootState) => state.contents)
  const [contentList, setContentList] = useState(contents)
  const [contentPage, setContentPage] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    setContentList(contents)
  }, [contents])

  const getContentList = (page: number) => {
    if (page === (contentList.length - 1) / 5 + 1)
      return contentList.slice((page - 1) * 5, contentList.length)
    return contentList.slice((page - 1) * 5, page * 5)
  }

  return (
    <Stack my="xl">
      <Title order={2}>Content</Title>
      <TextInput
        placeholder="Search contents"
        onChange={(e) => {
          setContentList(
            contents.filter((content: Content) => {
              return (
                content.title.toLowerCase().includes(e.currentTarget.value.toLowerCase()) ||
                content.author.toLowerCase().includes(e.currentTarget.value.toLowerCase()) ||
                content.content.toLowerCase().includes(e.currentTarget.value.toLowerCase()) ||
                content.date.toLowerCase().includes(e.currentTarget.value.toLowerCase())
              )
            })
          )
        }}
      />
      <Table withBorder>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Show</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getContentList(contentPage).map((content) => (
            <tr key={content.id}>
              <td>{content.title}</td>
              <td>{content.author}</td>
              <td>{content.date}</td>
              <td>
                {content.showOnHomePage ? (
                  <Text color="green" fw={700}>
                    Yes
                  </Text>
                ) : (
                  <Text color="red" fw={700}>
                    No
                  </Text>
                )}
              </td>
              <td width={'1em'}>
                <ActionIcon
                  onClick={() => {
                    modals.open({
                      title: <Text fw={700}>Edit content</Text>,
                      children: <EditContentModal onFinish={modals.closeAll} content={content} />,
                      size: 'xl'
                    })
                  }}>
                  <IconEdit />
                </ActionIcon>
              </td>
              <td width={'1em'}>
                <ActionIcon
                  onClick={() => {
                    dispatch(removeContent(content.id))
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
              title: <Text fw={700}>Add content</Text>,
              children: <AddContentModal onFinish={modals.closeAll} />,
              size: 'xl'
            })
          }}>
          Add content
        </Button>
        <Pagination
          total={(contentList.length - 1) / 5 + 1}
          onChange={(value) => {
            setContentPage(value)
          }}
        />
      </Group>
    </Stack>
  )
}

export default ContentSection
