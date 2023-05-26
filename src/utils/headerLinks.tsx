import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar } from '@mantine/core'

import { RootState } from '../store'

function headerLinks() {
  const currentUser = useSelector((state: RootState) => state.currentUser.user)
  const links: { label: string; link: string; icon: React.FC | null }[] = [
    { label: 'Home', link: '/', icon: null },
    { label: 'Search', link: '/search', icon: null }
  ]

  if (currentUser) {
    links.push({
      label: 'Profile',
      link: '/profile',
      icon: () => <Avatar src={currentUser.imgsrc} radius="xl" size="sm" />
    })
    if (currentUser.role === 'ADMIN' || currentUser.role === 'SUPERUSER') {
      links.push({ label: 'Admin', link: '/admin', icon: null })
    }
    return links
  } else {
    links.push({ label: 'Login', link: '/login', icon: null })
  }

  return links
}

export default headerLinks
