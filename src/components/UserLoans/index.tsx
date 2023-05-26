import { Box, Button, Loader } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { RootState, useAppDispatch } from '../../store'
import { fetchBooks } from '../../features/books/thunk'
import { fetchAuthors } from '../../features/authors/thunk'
import { fetchBookCopies, returnBookCopy } from '../../features/bookCopies/thunk'
import { Book, User } from '../../types'
import BookOverviewCard from '../BookOverviewCard'
import { fetchOwnUser } from '../../features/currentUser/thunk'

interface UserLoansProps {
  user: User
}

const UserLoans: React.FC<UserLoansProps> = ({ user }) => {
  const userLoans = useSelector((state: RootState) => state.currentUser.loans)
  const books = useSelector((state: RootState) => state.books.books)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          dispatch(fetchBooks()),
          dispatch(fetchAuthors()),
          dispatch(fetchBookCopies())
        ])
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [dispatch])

  const handleReturn = async (id: string) => {
    try {
      await dispatch(returnBookCopy(id))
      await Promise.all([dispatch(fetchBookCopies()), dispatch(fetchOwnUser())])
    } catch (err) {
      console.log(err)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Box my="xl">
      {userLoans.map((loan) => (
        <BookOverviewCard
          key={loan.id}
          book={
            books.find((book) => book.id === loan.bookId)
              ? books.find((book) => book.id === loan.bookId)!
              : ({} as Book)
          }
          actionButton={
            <Button
              color="orange"
              onClick={() => {
                handleReturn(loan.id)
              }}>
              Return
            </Button>
          }
        />
      ))}
    </Box>
  )
}

export default UserLoans
