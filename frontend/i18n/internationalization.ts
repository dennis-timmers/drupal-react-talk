export function formatDate (date: Date, locale: string = ''): string {
  return Intl.DateTimeFormat(locale).format(date)
}

export function formatTime (date: Date, locale: string = ''): string {
  return Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }).format(date)
}

export function formatCurrency (amount: number = 0, locale: string = ''): string {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}
