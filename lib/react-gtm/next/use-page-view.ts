import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { pageview } from '..'

/**
 * Registers a page view using Next.js router.
 */
export function usePageView (): void {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])
}
