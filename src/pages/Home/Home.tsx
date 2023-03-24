import React from 'react'
import { Avatar, Box, Container, Grid } from '@mantine/core'
import { HeaderResponsive } from '../../components/HeaderResponsive'
import { useSelector } from 'react-redux'
import { news } from '../../api/mock'
import { NewsCard } from '../../components/NewsCard'

const Home = () => {
  const currentUser = useSelector((state: any) => state.users.currentUser)
  let links: { label: string; link: string; icon: React.FC | null }[] = [
    { label: 'Home', link: '/', icon: null },
    { label: 'Search', link: '/search', icon: null }
  ]

  if (currentUser && currentUser.role === 'admin') {
    links.push({ label: 'Admin', link: '/admin', icon: null })
  }

  if (currentUser) {
    links.push({
      label: 'Profile',
      link: '/profile',
      icon: () => <Avatar src={currentUser.imgsrc} radius="xl" size="sm" />
    })
  } else {
    links.push({ label: 'Login', link: '/login', icon: null })
  }

  return (
    <Box>
      <HeaderResponsive links={links} />
      <Container size="md" className="home-page">
        <Grid grow gutter="xs">
          {news.map((item) => (
            <Grid.Col sm={6} xs={12}>
              <NewsCard {...item} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Home
