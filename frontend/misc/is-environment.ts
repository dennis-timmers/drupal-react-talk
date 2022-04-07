export function isClient (): boolean {
  return typeof window !== 'undefined'
}

export function isServer (): boolean {
  return typeof window === 'undefined'
}

export function isProduction (): boolean {
  return process.env.NODE_ENV === 'production'
}

export function isTest (): boolean {
  return process.env.NODE_ENV === 'test'
}

export function isDevelopment (): boolean {
  return process.env.NODE_ENV === 'development'
}
