import hashCode from './hashcode'

const generateId = (str: string): string => {
  const d = new Date()
  const time = d.getTime()
  return hashCode(str + time.toString()).toString()
}

export default generateId
