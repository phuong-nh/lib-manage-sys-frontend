import { useEffect, useState } from 'react'
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Text,
  Box,
  Space
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link, Outlet, useLocation } from 'react-router-dom'

const HEADER_HEIGHT = rem(60)

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1
  },

  sticky: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colors.white, // Adjust the background color according to your design
    zIndex: 1000
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md
    }
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color
    }
  }
}))

interface HeaderResponsiveProps {
  links: { link: string; label: string; icon: React.FC | null }[]
}

export function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const location = useLocation()
  const [opened, { toggle, close }] = useDisclosure(false)
  const [active, setActive] = useState(location.pathname)
  const { classes, cx } = useStyles()

  useEffect(() => {
    setActive(location.pathname)
  }, [location])

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={() => {
        // event.preventDefault()
        setActive(link.link)
        close()
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {link.icon && <link.icon />}
        {link.icon && <Space w="sm" />}
        {link.label}
      </Box>
    </Link>
  ))

  return (
    <Box>
      <Header
        height={HEADER_HEIGHT}
        className={cx(classes.root, classes.sticky)}
        sx={{ zIndex: 10 }}>
        <Container className={classes.header}>
          <Text size="xl">Library Management System</Text>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>

          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

          <Transition transition="pop-top-right" duration={200} mounted={opened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>
        </Container>
      </Header>
      <Outlet />
    </Box>
  )
}
