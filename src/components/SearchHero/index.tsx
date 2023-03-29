import {
  Title,
  Text,
  Container,
  Button,
  Overlay,
  createStyles,
  rem,
  TextInput,
  Space
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  wrapper: {
    order: 1,
    position: 'relative',
    paddingTop: rem(140),
    paddingBottom: rem(140),
    backgroundImage:
      'url(https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    [theme.fn.smallerThan('xs')]: {
      paddingTop: rem(80),
      paddingBottom: rem(50)
    }
  },

  inner: {
    position: 'relative',
    zIndex: 1
  },

  title: {
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: rem(-1),
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
      textAlign: 'left'
    }
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4]
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: 'center',

    [theme.fn.smallerThan('xs')]: {
      fontSize: theme.fontSizes.md,
      textAlign: 'left'
    }
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column'
    }
  },

  control: {
    height: rem(42),
    fontSize: theme.fontSizes.md,

    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md
    },

    [theme.fn.smallerThan('xs')]: {
      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0
      }
    }
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: 'rgba(255, 255, 255, .4)',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .45) !important'
    }
  }
}))

export function SearchHero() {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      searchTerms: ''
    },

    validate: {
      searchTerms: (value) => {
        if (!value) {
          return 'Search terms are required'
        } else if (value.length < 3) {
          return 'Search terms must be at least 3 characters long'
        } else {
          return null
        }
      }
    }
  })

  const onSubmit = (values: { searchTerms: string }) => {
    navigate(`/search?value=${values.searchTerms}`)
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <div className={classes.wrapper}>
        <Overlay color="#000" opacity={0.65} zIndex={1} />

        <div className={classes.inner}>
          <Title className={classes.title}>
            Find your next{' '}
            <Text component="span" inherit className={classes.highlight}>
              literature adventure
            </Text>
          </Title>

          <Space h="xl" />

          <Container size="md">
            <TextInput
              size="lg"
              placeholder="Search using book's name, authors, ISBNs, or description"
              {...form.getInputProps('searchTerms')}></TextInput>
          </Container>

          <div className={classes.controls}>
            <Button className={classes.control} size="lg" type="submit">
              Search
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
