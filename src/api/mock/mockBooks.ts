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
    authors: [
      {
        id: '1',
        givenName: 'George',
        surName: 'Orwell',
        fullName: 'George Orwell',
        imgsrc: null
      }
    ],
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
        borrowerId: '-674133727',
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
    authors: [
      {
        id: '2',
        givenName: 'Aldous',
        surName: 'Huxley',
        fullName: 'Aldous Huxley',
        imgsrc: null
      }
    ],
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
    id: '2049547879',
    title: 'Nick and Charlie (Heartstopper)',
    description:
      "From the mega-bestselling creator of Heartstopper, a must-have novella in which Heartstopper's lead characters, Nick and Charlie, face one of their biggest challenges yet.\n\nAbsence makes the heart grow fonder... right?\n\nEveryone knows that Nick and Charlie love their nearly inseparable life together. But soon Nick will be leaving for university, and Charlie, a year younger, will be left behind. Everyone's asking if they're staying together, which is a stupid question... or at least that's what Nick and Charlie assume at first.\n\nAs the time to say goodbye gets inevitably closer, both Nick and Charlie start to question whether their love is strong enough to survive being apart. Charlie is sure he's holding Nick back... and Nick can't tell what Charlie's thinking.\n\nThings spiral from there.\n\nEveryone knows that first loves rarely last forever. What will it take for Nick and Charlie to defy the odds?",
    publisher: 'Scholastic Press',
    publishedDate: '2023-01-03',
    ISBN: '1338885103',
    copies: [
      {
        id: '-344794726',
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      },
      {
        id: '-850353351',
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      },
      {
        id: '-1355911976',
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      },
      {
        id: '-1861470601',
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      },
      {
        id: '1927938070',
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      }
    ],
    authors: [
      {
        id: '871321049',
        givenName: 'Alice',
        surName: 'Oseman',
        fullName: 'Alice Oseman',
        imgsrc:
          'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/A1kWphkYCFL._SY600_.jpg'
      }
    ],
    imgsrc:
      'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/41Cz6CsjBJS._SX324_BO1,204,203,200_.jpg'
  },
  {
    id: '-297584117',
    title: 'Solitaire',
    description:
      "Tori Spring isn't sure how to be happy again. Then she meets Michael Holden, and they try to unmask the mysterious Solitaire (and survive A-Levels) in Alice Oseman's stunning, unflinching honest debut novel, which first introduced her fan-favourite Heartstopper characters Nick and Charlie.",
    publisher: "COLLINS CHILDREN'S BOOKS",
    publishedDate: '2014-01-01',
    ISBN: '9780007559220',
    copies: [
      {
        id: '-1098764627',
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      },
      {
        id: '-1604323252',
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      }
    ],
    authors: [
      {
        id: '871321049',
        givenName: 'Alice',
        surName: 'Oseman',
        fullName: 'Alice Oseman',
        imgsrc:
          'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/A1kWphkYCFL._SY600_.jpg'
      }
    ],
    imgsrc:
      'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/41qskltawpL._SX324_BO1,204,203,200_.jpg'
  },
  {
    id: '-899036073',
    title: 'Quantum Bullsh*t: How to Ruin Your Life with Advice from Quantum Physics',
    description:
      "Science is so f*cking rad. We don't deserve it.\n\nWhat actually is quantum physics? If you can answer that questions without bullsh*tting the person standing next to you in the bookstore, you can stop reading right now. But although most of us don't actually understand quantum physics, we know that it's mystical and awesome, and if we understood it we'd probably be rich and beautiful and happy, right? After all, there are plenty of people out there trying to sell you quantum crystals to align your quantum energy with your quantum destiny. Can they all be wrong?",
    publisher: 'Sourcebooks',
    publishedDate: '2023-01-17',
    ISBN: '172826605X',
    copies: [
      {
        id: '-312470655',
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      },
      {
        id: '-818029280',
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      }
    ],
    authors: [
      {
        id: '674507154',
        givenName: 'Chris',
        surName: 'Ferrie',
        fullName: 'Chris Ferrie',
        imgsrc:
          'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/S/amzn-author-media-prod/e85vrgp6apj9bgkt245u8mt50m._SY600_.jpg'
      }
    ],
    imgsrc: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/71dzjUkWn8L.jpg'
  },
  {
    id: '1818015966',
    title: 'The One: How an Ancient Idea Holds the Future of Physics',
    description:
      'A particle physicist makes the scientific case for monism, the ancient idea about the universe that says, all is One \n\nIn The One,  particle physicist Heinrich Päs presents a bold idea: fundamentally, everything in the universe is an aspect of one unified whole. The idea, called monism, has a rich three-thousand-year history: Plato believed that “all is one” before monism was rejected as irrational and suppressed as a heresy by the medieval Church. Nevertheless, monism persisted, inspiring Enlightenment science and Romantic poetry. Päs aims to show how monism could inspire physics today, how it could slice through the intellectual stagnation that has bogged down progress in modern physics and help the field achieve the grand theory of everything it has been chasing for decades. \n\nBlending physics, philosophy, and the history of ideas, The One is an epic, mind-expanding journey through millennia of human thought and into the nature of reality itself. ',
    publisher: 'Basic Books',
    publishedDate: '2023-01-17',
    ISBN: '1541674855',
    copies: [
      {
        id: '1535330273',
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      },
      {
        id: '1029771648',
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      }
    ],
    authors: [
      {
        id: '617654928',
        givenName: 'Heinrich',
        surName: 'Päs',
        fullName: 'Heinrich Päs',
        imgsrc:
          'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/S/amzn-author-media-prod/vmvquh4enpadtmj1s2tkb5se2e._SY600_.jpg'
      }
    ],
    imgsrc: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/817b3rGqWBL.jpg'
  },
  {
    id: '-671547682',
    title:
      'The Matter of Everything: How Curiosity, Physics, and Improbable Experiments Changed the World',
    description:
      'In The Matter of Everything, accelerator physicist Suzie Sheehy introduces us to the people who, through a combination of genius, persistence and luck, staged the experiments that changed the course of history. From the serendipitous discovery of X-rays in a German laboratory to the scientists trying to prove Einstein wrong (and inadvertently proving him right) to the race to split open the atom, these brilliant experiments led to some of the most significant breakthroughs in science and fundamentally changed our lives. They have helped us detect the flow of lava deep inside volcanoes, develop life-saving medical techniques like diagnostic imaging and radiation therapy, and create radio, TV, microwaves, smartphones—even the World Wide Web itself—among countless other advancements.',
    publisher: 'Knopf',
    publishedDate: '2023-01-10',
    ISBN: '0525658750',
    copies: [
      {
        id: '-593645708',
        status: 'available',
        borrowerId: null,
        borrowDate: null,
        returnDate: null
      }
    ],
    authors: [
      {
        id: '-2042835422',
        givenName: 'Suzie',
        surName: 'Sheehy',
        fullName: 'Suzie Sheehy',
        imgsrc: ''
      }
    ],
    imgsrc: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/81kmRUu+KLL.jpg'
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
