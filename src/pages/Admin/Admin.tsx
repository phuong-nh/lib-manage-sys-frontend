import { Box, Container, Divider, Group, Text, Title } from '@mantine/core'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

import UserSection from './UserSection'
import BookSection from './BookSection'
import AuthorSection from './AuthorSection'
import { RootState } from '../../store'

const Admin = () => {
  const currentUser = useSelector((state: RootState) => state.users.currentUser)

  return (
    <Box>
      {(currentUser && currentUser.role === 'admin') || <Navigate to="/" />}
      <Container size="lg" my="xl">
        <Title order={1}>Admin</Title>
        <Group>
          <Text>Manage user accounts and books here:</Text>
        </Group>
        <UserSection />
        <Divider />
        <BookSection />
        <Divider />
        <AuthorSection />
      </Container>
    </Box>
  )
}

export default Admin
