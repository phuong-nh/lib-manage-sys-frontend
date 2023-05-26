import { Box, Container, Divider, Grid, Space, Title } from '@mantine/core'

import { NewsCard } from '../../components/NewsCard'
import { BookRecommendationCard } from '../../components/BookRecommendationCard'
import { SearchHero } from '../../components/SearchHero'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { fetchContents } from '../../features/contents/thunk'
import { useEffect } from 'react'

const Home = () => {
  const dispatch = useAppDispatch()
  const contents = useSelector((state: RootState) => state.contents.contents)

  useEffect(() => {
    if (contents.length === 0) {
      dispatch(fetchContents())
    }
  }, [contents.length, dispatch])

  return (
    <Box>
      <SearchHero />
      <Container size="md" className="home-page">
        <Space h="xl" />
        <Title order={2}>News & Infos</Title>
        <Space h="xl" />
        <Grid grow gutter="xs">
          {contents
            .filter((item) => item.showOnHomePage && item.contentType === 'NEWS')
            .map((content) => (
              <Grid.Col sm={6} xs={12} key={content.id} sx={{ minHeight: '100%' }}>
                <NewsCard key={content.id} content={content} />
              </Grid.Col>
            ))}
        </Grid>
        <Space h="xl" />
        <Divider mt="xl" mb="xl" />
        <Title order={2}>Recommended books & activities</Title>
        <Space h="xl" />
        <Grid grow gutter="xs">
          {contents
            .filter((item) => item.showOnHomePage && item.contentType === 'BLOG')
            .map((content) => (
              <Grid.Col sm={6} xs={12} key={content.id} sx={{ minHeight: '100%' }}>
                <NewsCard key={content.id} content={content} />
              </Grid.Col>
            ))}
        </Grid>
        <Space h="xl" />
      </Container>
    </Box>
  )
}

export default Home
