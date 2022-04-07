import { useRouter } from 'next/router'
import { resolveLocaleIdentifier } from '@i18n/localization'
import { nullUndefCheck } from '@misc/helpers'

interface BreadCrumbReturnProps {
  title: string
  crumb: string
  isActive: boolean
}

export default function useBreadcrumb (): BreadCrumbReturnProps[] {
  const router = useRouter()
  const locale = resolveLocaleIdentifier(router.locale ?? '')
  const asPath = router.asPath === '/' ? '' : router.asPath

  // Get elligible crumb parts from path, excluding the first empty string.
  const pathWithoutParam = asPath.split('?')
  const paths = pathWithoutParam[0].split('/')

  return paths.map((_, index, array) => {
    let title = ''
    const path = array[index]
    const includesPath = router?.locales?.includes(array[index]) ?? false

    if (includesPath) {
      title = 'Home'
    } else {
      title = !nullUndefCheck(path) ? 'Home' : decodeURIComponent(path).replace(/[-_]/g, ' ')
    }

    // Create the breadcrumb by joining the locale and all all items until the current index together.
    const crumb = locale.toPath(array.slice(0, index + 1).join('/') ?? '/')

    return {
      title,
      crumb,
      isActive: locale.toPath(asPath) === crumb
    }
  })
}
