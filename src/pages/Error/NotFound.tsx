import { Box, Button, Container, Text } from '@mantine/core'
import { useNavigate } from 'react-router'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Container size="xl" p="xl">
      <Text size={80} color="red">
        <b>404 not found</b>
      </Text>
      <Text size={60}>This place looks weird, let&apos;s go somewhere else!</Text>
      <Box sx={{ height: '2rem' }} />
      <Box display={'flex'}>
        <Button
          size="xl"
          color="red"
          onClick={() => {
            navigate(-1)
          }}>
          Go back
        </Button>
        <Box sx={{ width: '1rem' }} />
        <Button
          size="xl"
          color="red"
          onClick={() => {
            navigate('/')
          }}>
          Go home
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound
