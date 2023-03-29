import { Content } from '../../types'

export const mockContent: Content[] = [
  {
    id: '1',
    title: 'New Arrivals: Top 5 Books to Read This Month',
    type: 'news',
    content: `<p>Check out our top 5 new arrivals this month:</p>
              <ol>
                <li><strong>The Chronicles of Time</strong> by Jane Doe</li>
                <li><strong>Universe Beyond</strong> by John Smith</li>
                <li><strong>Quantum Leap</strong> by Maria Johnson</li>
                <li><strong>The Power of Dreams</strong> by Michael Brown</li>
                <li><strong>Exploring the Cosmos</strong> by Sarah Davis</li>
              </ol>
              <p>Visit our library to borrow these amazing new books today!</p>`,
    date: new Date().toISOString(),
    showOnHomePage: true,
    author: 'Dungeon Master'
  },
  {
    id: '2',
    title: 'Library Hours Update',
    type: 'news',
    content: `<p>Starting from next week, our library hours will be as follows:</p>
              <ul>
                <li>Monday to Friday: 9:00 AM - 7:00 PM</li>
                <li>Saturday: 10:00 AM - 4:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
              <p>Visit our library to borrow these amazing new books today!</p>`,
    date: new Date().toISOString(),
    showOnHomePage: true,
    author: 'Jessica'
  }
]
