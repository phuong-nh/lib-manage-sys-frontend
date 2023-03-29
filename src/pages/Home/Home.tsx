import { Box, Container, Divider, Grid, Space, Title } from '@mantine/core'

import { news, recommendedBooks } from '../../api/mock'
import { NewsCard } from '../../components/NewsCard'
import { BookRecommendationCard } from '../../components/BookRecommendationCard'
import { SearchHero } from '../../components/SearchHero'

const Home = () => {
  return (
    <Box>
      <SearchHero />
      <Container size="md" className="home-page">
        <Space h="xl" />
        <Title order={2}>News & Infos</Title>
        <Space h="xl" />
        <Grid grow gutter="xs">
          {news.map(({ id, ...other }) => (
            <Grid.Col sm={6} xs={12}>
              <NewsCard {...other} />
            </Grid.Col>
          ))}
        </Grid>
        <Space h="xl" />
        <Divider mt="xl" mb="xl" />
        <Title order={2}>Recommended Books</Title>
        <Space h="xl" />
        <Grid grow gutter="xs">
          {recommendedBooks.map(({ id, ...other }) => (
            <Grid.Col sm={6} xs={12}>
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
