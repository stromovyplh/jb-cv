export const formatMonth = (value: string | null | undefined) => {
  if (!value) return ''

  const [year, month] = value.split('-')
  const date = new Date(Number(year), Number(month) - 1)

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(date)
}
