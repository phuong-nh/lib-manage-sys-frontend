import { Box, Button, Container, Text } from '@mantine/core'

const NotFound = () => {
  return (
    <Container size="xl" p="xl">
      <Text size={80} color="red">
        <b>404 not found</b>
      </Text>
      <Text size={60}>This place looks weird, let's go somewhere else!</Text>
      <Box sx={{ height: '2rem' }} />
      <Box display={'flex'}>
        <Button size="xl" color="red">Go back</Button>
        <Box sx={{ width: '1rem' }} />
        <Button size="xl" color="red">Go home</Button>
      </Box>
    </Container>
  )
}

export default NotFound
