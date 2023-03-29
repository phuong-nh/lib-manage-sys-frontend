import { Box, Button } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'

import { returnBook } from '../../features/library/slice'
import { RootState } from '../../store'
import { Book, User } from '../../types'
import BookOverviewCard from '../BookOverviewCard'

interface UserLoansProps {
  user: User
}

const UserLoans: React.FC<UserLoansProps> = ({ user }) => {
  const books = useSelector((state: RootState) => state.library.books)
  const userLoans = books.filter(
    (book: Book) => book.copies.find((copy) => copy.borrowerId === user.id) !== undefined
  )
  const dispatch = useDispatch()

  return (
    <Box my="xl">
      {userLoans.map((loan) => (
        <BookOverviewCard
          key={loan.id}
          book={loan}
          actionButton={
            <Button
              color="orange"
              onClick={() => {
                const copySearch = loan.copies.find((copy) => copy.borrowerId === user.id)
                if (copySearch !== undefined) {
                  dispatch(
                    returnBook({
                      bookId: loan.id,
                      copyId: copySearch.id,
                      returnDate: '2023-11-11'
                    })
                  )
                }
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
