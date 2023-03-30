import { Box, Container, Space, Text, Title } from '@mantine/core'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import parse from 'html-react-parser'

import { RootState } from '../../store'
import NotFound from '../Error/NotFound'

function ContentPost() {
  const { id } = useParams<{ id: string }>()
  const contents = useSelector((state: RootState) => state.contents)
  const content = contents.find((item) => item.id === id)

  if (!content) return <NotFound />

  return (
    <Box my="xl">
      <Container size="sm">
        <img src={content.imageUrl} alt={content.title} style={{ width: '100%', height: '100%' }} />
        <Space h="xl" />
        <Title order={2}>{content.title}</Title>
        <Title order={5} color="dimmed">
          {content.author}
        </Title>
        <Space h="xl" />
        <Text>{parse(content.content)}</Text>
      </Container>
    </Box>
  )
}

export default ContentPost
