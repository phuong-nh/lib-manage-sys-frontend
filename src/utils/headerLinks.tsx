import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar } from '@mantine/core'

function headerLinks() {
  const currentUser = useSelector((state: any) => state.users.currentUser)
  let links: { label: string; link: string; icon: React.FC | null }[] = [
    { label: 'Home', link: '/', icon: null },
    { label: 'Search', link: '/search', icon: null }
  ]

  if (currentUser && currentUser.role === 'admin') {
    links.push({ label: 'Admin', link: '/admin', icon: null })
  }

  if (currentUser) {
    links.push({
      label: 'Profile',
      link: '/profile',
      icon: () => <Avatar src={currentUser.imgsrc} radius="xl" size="sm" />
    })
  } else {
    links.push({ label: 'Login', link: '/login', icon: null })
  }
  return links
}

export default headerLinks
