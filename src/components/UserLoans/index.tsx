import { Box, Button, Card, Center, Group, Space, Title, Text } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { returnBook } from '../../features/library/slice'
import { Author, Book, User } from '../../types'
import BookOverviewCard from '../BookOverviewCard'

interface UserLoansProps {
  user: User
}

const UserLoans: React.FC<UserLoansProps> = ({ user }) => {
  const books = useSelector((state: any) => state.library.books)
  const userLoans = books.filter(
    (book: Book) => book.copies.find((copy: any) => copy.borrowerId === user.id) !== undefined
  )
  const dispatch = useDispatch()

  return (
    <Box my="xl">
      {userLoans.map((loan: any) => (
        <BookOverviewCard key={loan.id}
          book={loan}
          actionButton={
            <Button
              color='orange'
              onClick={() => {
                dispatch(
                  returnBook({
                    bookId: loan.id,
                    copyId: loan.copies.find((copy: any) => copy.borrowerId === user.id).id,
                    returnDate: '2023-11-11'
                  })
                )
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
