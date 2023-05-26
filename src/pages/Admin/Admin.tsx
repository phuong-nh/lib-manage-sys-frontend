import { Box, Container, Divider, Group, Text, Title } from '@mantine/core'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

import UserSection from './UserSection'
import BookSection from './BookSection'
import AuthorSection from './AuthorSection'
import ContentSection from './ContentSection'
import { RootState, useAppDispatch } from '../../store'
import { useEffect, useState } from 'react'
import { fetchBooks } from '../../features/books/thunk'
import { fetchAuthors } from '../../features/authors/thunk'
import { fetchBookCopies } from '../../features/bookCopies/thunk'
import { fetchUsers } from '../../features/users/thunk'
import { fetchCategories } from '../../features/categories/thunk'
import { fetchContents } from '../../features/contents/thunk'

const Admin = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser.user)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const loadAdminData = async () => {
      setIsLoading(true)
      try {
        await Promise.all([
          dispatch(fetchBooks()),
          dispatch(fetchAuthors()),
          dispatch(fetchBookCopies()),
          dispatch(fetchUsers()),
          dispatch(fetchCategories()),
          dispatch(fetchContents())
        ])
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadAdminData()
  }, [dispatch])

  return (
    <Box>
      {!currentUser ||
        (currentUser.role !== 'ADMIN' && currentUser.role !== 'SUPERUSER' && <Navigate to="/" />)}
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
        <Divider />
        <ContentSection />
      </Container>
    </Box>
  )
}

export default Admin
