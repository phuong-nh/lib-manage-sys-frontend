export default function strToDate(str: string) {
  const [year, month, day] = str.split('-')
  return new Date(Number(year), Number(month) - 1, Number(day))
}
