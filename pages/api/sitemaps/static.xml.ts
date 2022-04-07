import { getCmsUrl } from '@misc/environments'
import { NextApiRequest, NextApiResponse } from 'next'
import resolveApiUrl from '@misc/resolve-api-url'
import { SitemapStream, streamToPromise } from 'sitemap'
import { createGzip } from 'zlib'
import { resolveLocaleIdentifier } from '@i18n/localization'
import { DEFAULT_SITEMAP_REVALIDATE } from '@constants/revalidate'
import nextConfig from '../../../next.config'

const staticPages = ['/']

let sitemap: Buffer | undefined

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  res.setHeader(
    'Cache-Control',
    `s-maxage=${DEFAULT_SITEMAP_REVALIDATE}, stale-while-revalidate`
  )
  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Content-Encoding', 'gzip')

  if (sitemap != null) {
    res.send(sitemap)
    return res.end()
  }

  try {
    if (req.method !== 'GET') {
      return res.status(405).end()
    }

    const url = resolveApiUrl(new URL(getCmsUrl()), { www: true })

    const smStream = new SitemapStream({ hostname: url.origin })

    const pipeline = smStream.pipe(createGzip())

    streamToPromise(pipeline).then(sm => {
      sitemap = sm
    }).finally(() => {})

    staticPages.forEach(path => {
      nextConfig.i18n.locales.forEach(locale => {
        const localeIdentifier = resolveLocaleIdentifier(locale)

        smStream.write({
          url: localeIdentifier.toPath(path),
          changefreq: 'daily',
          priority: 0.7
        })
      })
    })

    smStream.end()

    pipeline.pipe(res).on('error', e => {
      throw e
    })
  } catch (error) {
    return res.status(400).json({ error })
  }
}
