import { Card, Image, Text, Group, Center, Avatar, createStyles, rem, Button } from '@mantine/core'
import { useNavigate } from 'react-router'

import { Content } from '../../types'

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
  content: Content
}

export function NewsCard({
  content,
  className,
  ...others
}: NewsCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof NewsCardProps>) {
  const { classes, cx } = useStyles()
  const navigate = useNavigate()
  const contentStripped = content.content
    .replace(/(<([^>]+)>)/gi, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/(\r\n|\n|\r)/gm, ' ')
    .replace(/\s+/g, ' ')

  return (
    <Card
      withBorder
      radius="md"
      className={cx(classes.card, className)}
      {...others}
      sx={{ minHeight: '100%' }}>
      <Card.Section>
        <Image src={content.imageUrl} height={180} />
      </Card.Section>

      <Text className={classes.title} fw={500}>
        {content.title}
      </Text>

      <Text fz="sm" color="dimmed" lineClamp={4}>
        {contentStripped.length > 100 ? contentStripped.substring(0, 100) + '...' : contentStripped}
      </Text>

      <Group position="apart" className={classes.footer}>
        <Center>
          <Avatar src={content.author} size={24} radius="xl" mr="xs" />
          <Text fz="sm" inline>
            {content.author}
          </Text>
        </Center>
        <Button
          onClick={() => {
            navigate('/content/' + content.id)
          }}>
          More
        </Button>
      </Group>
    </Card>
  )
}
