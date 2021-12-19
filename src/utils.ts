export const isMobile = window.innerWidth <= 700

export const getRandomValue = (minValue: number, maxValue: number) => {
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)
}

export const getRandomPositionFromArray = (arrayLength: number) => {
  return Math.floor(Math.random() * arrayLength)
}

export const currencyFormatter = (locale: string, currency: string) => new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR'
})