import {
  ActionIcon,
  Box,
  Button,
  Container,
  Divider,
  Group,
  Modal,
  Pagination,
  Stack,
  Table,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { useSelector } from 'react-redux'
import { Author, Book, User } from '../../types'
import { IconEdit, IconPlus } from '@tabler/icons-react'
import { useDisclosure, usePagination } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { AddUserModal } from '../../components/AdminDataMod'
import UserSection from './UserSection'
import BookSection from './BookSection'
import AuthorSection from './AuthorSection'

const Admin = () => {
  return (
    <Box>
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
