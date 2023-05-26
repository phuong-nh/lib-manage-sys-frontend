import { Box, Center, Container, Space, Text, Title } from '@mantine/core'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import parse from 'html-react-parser'
import { useEffect, useState } from 'react'
import { Loader } from '@mantine/core'

import { RootState } from '../../store'
import NotFound from '../Error/NotFound'
import { Content, User } from '../../types'
import { getContentAuthorInfo } from '../../api'

function ContentPost() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const availableContents = useSelector((state: RootState) => state.contents.contents)
  const [content, setContent] = useState<Content | null>(null)
  const [authorInfo, setAuthorInfo] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentFromStore = availableContents.find((content) => content.id === id)
        if (contentFromStore) {
          setContent(contentFromStore)
        } else {
          const response = await fetch(import.meta.env.VITE_API_URL + '/contents/' + id, {
            method: 'GET',
            headers: {
              Accept: 'application/json'
            }
          })
          if (!response.ok) {
            throw new Error('Failed to get content')
          }
          const data = await response.json()
          setContent(data as Content)
        }
      } catch (error) {
        setError(true)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [id, dispatch, availableContents])

  useEffect(() => {
    const fetchAuthorInfo = async () => {
      try {
        if (!content?.authorId) throw new Error('No authorId')
        const authorInfo = await getContentAuthorInfo(content.authorId)
        setAuthorInfo(authorInfo)
      } catch (error) {
        setError(true)
        console.error(error)
      }
    }

    if (content) {
      fetchAuthorInfo()
    }
  }, [content])

  if (error)
    return (
      <Container fluid>
        <Center>
          <Loader />
        </Center>
      </Container>
    )

  if (isLoading || !content || !authorInfo) {
    return <Loader />
  }

  return (
    <Box my="xl">
      <Container size="sm">
        {content.imgsrc && (
          <img src={content.imgsrc} alt={content.title} style={{ width: '100%', height: '100%' }} />
        )}
        <Space h="xl" />
        <Title order={2}>{content.title}</Title>
        <Title order={5} color="dimmed">
          {authorInfo?.isGivenSurName
            ? authorInfo.givenName + ' ' + authorInfo.surName
            : authorInfo?.surName + ' ' + authorInfo?.givenName}
        </Title>
        <Space h="xl" />
        <Text>{parse(content.content)}</Text>
      </Container>
    </Box>
  )
}

export default ContentPost
