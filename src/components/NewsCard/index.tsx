import { Card, Image, Text, Group, Center, Avatar, createStyles, rem } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
  },

  rating: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: rem(12),
    pointerEvents: 'none'
  },

  title: {
    display: 'block',
    marginTop: theme.spacing.md,
    marginBottom: rem(5)
  },

  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    })
  },

  footer: {
    marginTop: theme.spacing.md
  }
}))

interface NewsCardProps {
  image: string
  link: string
  title: string
  description: string
  author: {
    name: string
    image: string
  }
}

export function NewsCard({
  className,
  image,
  link,
  title,
  description,
  author,
  ...others
}: NewsCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof NewsCardProps>) {
  const { classes, cx } = useStyles()
  const linkProps = { href: link, target: '_blank', rel: 'noopener noreferrer' }

  return (
    <Card withBorder radius="md" className={cx(classes.card, className)} {...others}>
      <Card.Section>
        <a {...linkProps}>
          <Image src={image} height={180} />
        </a>
      </Card.Section>

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        {title}
      </Text>

      <Text fz="sm" color="dimmed" lineClamp={4}>
        {description}
      </Text>

      <Group position="apart" className={classes.footer}>
        <Center>
          <Avatar src={author.image} size={24} radius="xl" mr="xs" />
          <Text fz="sm" inline>
            {author.name}
          </Text>
        </Center>
      </Group>
    </Card>
  )
}
