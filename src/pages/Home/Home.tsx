import { Box, Container, Divider, Grid, Space, Title } from '@mantine/core'

import { recommendedBooks } from '../../api/mock'
import { NewsCard } from '../../components/NewsCard'
import { BookRecommendationCard } from '../../components/BookRecommendationCard'
import { SearchHero } from '../../components/SearchHero'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const Home = () => {
  const contents = useSelector((state: RootState) => state.contents)

  return (
    <Box>
      <SearchHero />
      <Container size="md" className="home-page">
        <Space h="xl" />
        <Title order={2}>News & Infos</Title>
        <Space h="xl" />
        <Grid grow gutter="xs">
          {contents
            .filter((item) => item.showOnHomePage)
            .map((content) => (
              <Grid.Col sm={6} xs={12} key={content.id} sx={{ minHeight: '100%' }}>
                <NewsCard key={content.id} content={content} />
              </Grid.Col>
            ))}
        </Grid>
        <Space h="xl" />
        <Divider mt="xl" mb="xl" />
        <Title order={2}>Recommended Books</Title>
        <Space h="xl" />
        <Grid grow gutter="xs">
          {recommendedBooks.map(({ id, ...other }) => (
            <Grid.Col sm={6} xs={12} key={id}>
              <BookRecommendationCard {...other} />
            </Grid.Col>
          ))}
        </Grid>
        <Space h="xl" />
      </Container>
    </Box>
  )
}

export default Home
