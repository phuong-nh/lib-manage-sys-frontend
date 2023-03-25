import { User } from "../../types";
import hashCode from "../../utils/hashcode";

export const mockUsers: User[] = [
  {
    id: hashCode('alice.admin@example.com').toString(),
    givenName: 'Alice',
    surName: 'Admin',
    fullName: 'Alice Admin',
    email: 'alice.admin@example.com',
    role: 'admin',
    imgsrc: null
  },
  {
    id: hashCode('bob.user@example.com').toString(),
    givenName: 'Bob',
    surName: 'User',
    fullName: 'Bob User',
    email: 'bob.user@example.com',
    role: 'user',
    imgsrc: null
  },
  {
    id: hashCode('carol.cooper@example.com').toString(),
    givenName: 'Carol',
    surName: 'Cooper',
    fullName: 'Carol Cooper',
    email: 'carol.cooper@example.com',
    role: 'user',
    imgsrc: null
  },
  {
    id: hashCode('dave.doe@example.com').toString(),
    givenName: 'Dave',
    surName: 'Doe',
    fullName: 'Dave Doe',
    email: 'dave.doe@example.com',
    role: 'user',
    imgsrc: null
  },
  {
    id: hashCode('eve.evergreen@example.com').toString(),
    givenName: 'Eve',
    surName: 'Evergreen',
    fullName: 'Eve Evergreen',
    email: 'eve.evergreen@example.com',
    role: 'user',
    imgsrc: null
  },
  {
    id: hashCode('frank.frost@example.com').toString(),
    givenName: 'Frank',
    surName: 'Frost',
    fullName: 'Frank Frost',
    email: 'frank.frost@example.com',
    role: 'user',
    imgsrc: null
  }
]
