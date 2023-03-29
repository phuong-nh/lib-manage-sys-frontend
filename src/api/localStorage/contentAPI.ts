import { Content } from '../../types'

const CONTENT_KEY = 'content'

export const saveContent = (content: Content[]): void => {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(content))
}

export const loadContent = (): Content[] => {
  const contentData = localStorage.getItem(CONTENT_KEY)
  if (contentData) {
    return JSON.parse(contentData)
  }
  return []
}
