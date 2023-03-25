import { Box, Button, Card, Center, Grid, Group, Space, Stack, Text, Title } from '@mantine/core'
import React from 'react'
import { Author, Book } from '../../types'

interface BookOverviewCardProps {
  book: Book,
  actionButton: React.ReactNode
}

const BookOverviewCard: React.FC<BookOverviewCardProps> = ({book, actionButton}) => {
  return (
    <Card radius="md" withBorder my="xs">
      <Group align={'flex-start'} spacing="xl" position="apart">
        <Group noWrap align={'flex-start'} spacing="xl">
          <Box h="100%">
            <Center>
              <Box sx={{ width: '6rem', height: '8rem' }}>
                {book.imgsrc ? (
                  <img
                    src={book.imgsrc}
                    alt={book.title}
                    style={{ height: '100%', width: '100%' }}
                  />
                ) : (
                  <img
                    src="src/assets/images/greyBook.png"
                    alt={book.title}
                    style={{ height: '100%', width: '100%' }}
                  />
                )}
              </Box>
            </Center>
          </Box>
          <Box>
            <Title order={3}>{book.title}</Title>
            <Title order={6}>{book.authors.map((author: Author) => author.fullName).join(', ')}</Title>
            <Text>{book.description}</Text>
            <Space h={'xs'} />
          </Box>
        </Group>
        {actionButton}
      </Group>
    </Card>
  )
}

export default BookOverviewCard
