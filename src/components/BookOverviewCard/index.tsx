import { Box, Button, Card, Center, Group, Space, Stack, Text, Title } from '@mantine/core'
import React from 'react'

import { Author, Book } from '../../types'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'

interface BookOverviewCardProps {
  book: Book
  actionButton: React.ReactNode
}

const BookOverviewCard: React.FC<BookOverviewCardProps> = ({ book, actionButton }) => {
  const [expand, setExpand] = React.useState(false)
  const authors = useSelector((state: RootState) => state.authors.authors)

  return (
    <Card radius="md" withBorder my="xs">
      <Group noWrap align={'flex-start'} spacing="xl">
        <Box h="100%">
          <Center>
            <Box sx={{ width: '6rem', height: '9rem' }}>
              {book.imgsrc ? (
                <img src={book.imgsrc} alt={book.title} style={{ height: '100%', width: '100%' }} />
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
        <Stack sx={{ flex: 1 }}>
          <Box>
            <Title order={3}>{book.title}</Title>
            <Title order={6}>
              {book.authorIds
                .map((authorId) => {
                  const author = authors.find((author: Author) => author.id === authorId)
                  if (!author) return ''
                  return author.isGivenSurName
                    ? author.givenName + ' ' + author.surName
                    : author.surName + ' ' + author.givenName
                })
                .join(', ')}
            </Title>
            <Text>
              {book.description.length > 200 && !expand
                ? book.description.substring(0, 200) + '...'
                : book.description}
            </Text>
            {book.description.length > 200 && (
              <Button
                variant="link"
                color="gray"
                size="xs"
                p="0"
                onClick={() => {
                  setExpand(!expand)
                  // console.log(expand)
                }}>
                {expand ? 'Show less' : 'Show more'}
              </Button>
            )}

            <Space h={'xs'} />
          </Box>
          <Group position="right">{actionButton}</Group>
        </Stack>
      </Group>
    </Card>
  )
}

export default BookOverviewCard
