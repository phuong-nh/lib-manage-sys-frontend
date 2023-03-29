import { Book } from '../../types'
import hashCode from '../../utils/hashcode'
import { mockAuthors } from './mockAuthors'

export const mockBooks: Book[] = [
  {
    id: '1',
    ISBN: '9780451524935',
    title: '1984',
    description: 'A dystopian novel set in the totalitarian society of Oceania.',
    publisher: 'Penguin Books',
    authors: [mockAuthors[0]],
    publishedDate: '1949-06-08',
    imgsrc:
      'https://ia801401.us.archive.org/view_archive.php?archive=/32/items/l_covers_0008/l_covers_0008_57.tar&file=0008579190-L.jpg',
    copies: [
      {
        id: '1_1',
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      },
      {
        id: '1_2',
        status: 'borrowed',
        borrowerId: hashCode('bob.user@example.com').toString(),
        borrowDate: '2023-04-01',
        returnDate: '2023-04-15'
      }
    ]
  },
  {
    id: '2',
    ISBN: '9780060850524',
    title: 'Brave New World',
    description: 'A dystopian novel set in a futuristic society ruled by the World State.',
    publisher: 'HarperCollins',
    authors: [mockAuthors[1]],
    publishedDate: '1932-08-01',
    imgsrc: 'https://covers.openlibrary.org/b/id/13008776-L.jpg',
    copies: [
      {
        id: '2_1',
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      }
    ]
  },
  {
    id: '3',
    ISBN: '9780547928227',
    title: 'The Hobbit',
    description: 'A fantasy novel and prelude to The Lord of the Rings trilogy.',
    publisher: 'Houghton Mifflin Harcourt',
    authors: [mockAuthors[2]],
    publishedDate: '1937-09-21',
    imgsrc: 'https://covers.openlibrary.org/b/id/13766603-L.jpg',
    copies: [
      {
        id: '3_1',
        status: 'borrowed',
        borrowerId: hashCode('carol.cooper@example.com').toString(),
        borrowDate: '2023-04-05',
        returnDate: '2023-04-19'
      },
      {
        id: '3_2',
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      },
      {
        id: '3_3',
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      }
    ]
  }
]
