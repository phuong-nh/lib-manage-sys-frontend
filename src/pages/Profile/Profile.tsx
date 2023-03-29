import { Box, Container, Divider, Title } from '@mantine/core'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

import UserInfo from '../../components/OwnUserInfo'
import UserLoans from '../../components/UserLoans'
import { RootState } from '../../store'

const Profile = () => {
  const currentUser = useSelector((state: RootState) => state.users.currentUser)

  return (
    <Box>
      {currentUser ? (
        <Container size="md" my="xl">
          <Title order={1}>Profile</Title>
          <UserInfo user={currentUser} />
          <Divider my="xl" />
          <Title order={2}>Loans</Title>
          <UserLoans user={currentUser} />
          <Divider my="xl" />
        </Container>
      ) : (
        <Navigate to="/" />
      )}
    </Box>
  )
}

export default Profile
