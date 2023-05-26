import { useSelector } from 'react-redux'
import { Box, Container } from '@mantine/core'
import { Navigate } from 'react-router'

import { AuthenticationForm } from '../../components/AuthenticationForm'
import { RootState } from '../../store'

const Login = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser.user)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {currentUser && <Navigate to="/" />}
      <Container size="xs" py="xl">
        <AuthenticationForm />
        <Box sx={{ height: '20vh' }} />
      </Container>
    </Box>
  )
}

export default Login
