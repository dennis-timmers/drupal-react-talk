import React from 'react'
import Link from 'next/link'
import {
  useLocaleIdentifier,
  useRegionalLocaleIdentifiers
} from '@i18n/localization'
import { useRouter } from 'next/router'

export default function LanguageSwitch (): JSX.Element {
  const router = useRouter()
  const localeIdentifier = useLocaleIdentifier()
  const localeIdentifiersByRegion = useRegionalLocaleIdentifiers()

  return (
    <nav>
      {Object.entries(localeIdentifiersByRegion).map(
        ([region, localeIdentifiers]) => (
          <React.Fragment key={`${region}--fragment`}>
            <h3>{region}</h3>
            <ul>
              {localeIdentifiers.map(l =>
                localeIdentifier.locale !== l.locale ? (
                  <li key={l.locale}>
                    <Link href={router.asPath} locale={l.locale}>
                      {l.language}
                    </Link>
                  </li>
                ) : (
                  <li key={l.locale}>
                    <span>{l.language} &mdash; you are here</span>
                  </li>
                )
              )}
            </ul>
          </React.Fragment>
        )
      )}
    </nav>
  )
}
