import { nullUndefCheck } from '@misc/helpers'

export default function resolveApiUrl (
  url: URL,
  options?: { endpoint?: string, ssl?: boolean, www?: boolean }
): URL {
  const opts = {
    endpoint: '/graphql',
    ssl: true,
    subdomain: 'cms',
    www: false,
    ...options
  }

  let { hostname } = url

  if (hostname.endsWith('.localhost')) {
    hostname = url.hostname.substr(
      0,
      url.hostname.length - '.localhost'.length
    )
  }

  if (hostname.startsWith('www')) {
    hostname = hostname.replace('www', opts.subdomain)
  } else if (!hostname.startsWith(opts.subdomain)) {
    hostname = `${opts.subdomain}.${hostname}`
  }

  if (opts.www) {
    hostname = hostname.replace(opts.subdomain, 'www')
  }

  const protocol = opts.ssl ? 'https' : 'http'
  let endpoint = ''
  let search = ''
  let hash = ''

  if (nullUndefCheck(opts.endpoint)) {
    endpoint = opts.endpoint
  } else {
    endpoint = url.pathname
  }

  if (nullUndefCheck(url.search)) {
    search = `?${url.search}`
  }

  if (nullUndefCheck(url.hash)) {
    hash = `#${url.hash}`
  }

  hostname = `${protocol}://${hostname}${endpoint}${search}${hash}`

  return new URL(hostname)
}
