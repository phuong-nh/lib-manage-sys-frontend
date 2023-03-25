import React from 'react'
import { Avatar, Box, Container, Divider, Grid, Space, Text, Title } from '@mantine/core'
import { HeaderResponsive } from '../../components/HeaderResponsive'
import { useSelector } from 'react-redux'
import { news, recommendedBooks } from '../../api/mock'
import { NewsCard } from '../../components/NewsCard'
import { BookRecommendationCard } from '../../components/BookRecommendationCard'
import { SearchHero } from '../../components/SearchHero'
import headerLinks from '../../utils/headerLinks'

const Home = () => {
  let links: { label: string; link: string; icon: React.FC | null} [] = headerLinks()

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
