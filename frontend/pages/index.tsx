// Base
import React from 'react'
import { GetStaticProps } from 'next'

// Graphql
// import resolveApiUrl from '@misc/resolve-api-url';
// import { createGraphqlRequestSdk } from '@misc/graphql-request-sdk';
// import { getCmsUrl } from '@misc/environments';

// Constants
import { DEFAULT_REVALIDATE } from '@constants/revalidate'

// Localization
import {
  useLocaleIdentifier,
  useRegionalLocaleIdentifiers
  // resolveLocaleIdentifier,
} from '@i18n/localization'

import { useKlot } from '@i18n/translate'
import {
  formatCurrency,
  formatDate,
  formatTime
} from '@i18n/internationalization'

// SEO
import Metatags from '@components/molecules/Metatags/Component'

// Components
import LanguageSwitch from '@components/organisms/LanguageSwitch/Component'
import { IconMapper } from '@components/atoms/Icons/Component'

// Redirects
// import { getRedirect } from '@misc/redirect';

export const getStaticProps: GetStaticProps = async () => {
  // const locale = ctx.locale ?? ctx.defaultLocale ?? '';
  // const localeIdentifier = resolveLocaleIdentifier(locale);

  // const url = resolveApiUrl(new URL(getCmsUrl()));
  // const sdk = createGraphqlRequestSdk(url);

  // const path = localeIdentifier.toPath('/');
  // const redirect = await getRedirect(path, sdk);

  // if (redirect) {
  //   return redirect;
  // }

  return {
    revalidate: DEFAULT_REVALIDATE,
    props: {
      date: new Date().toString()
    }
  }
}

export default function Homepage (props: { date: string }): JSX.Element {
  const localeIdentifier = useLocaleIdentifier()
  const localeIdentifiersByRegion = useRegionalLocaleIdentifiers()
  const t = useKlot()
  const Icon = IconMapper('arrow-right')

  return (
    <>
      <Metatags
        {...{
          title: 'Page title',
          description: 'Page description'
        }}
      />
      <h1>burst-digital/burst-next-app</h1>
      <small>{props.date}</small>

      <h2>Icons</h2>
      <p>Use the iconMapper to retrieve icons: {Icon} </p>

      <LanguageSwitch />
      <h2>Translation test</h2>
      <h3>{t('Test')}</h3>
      <h2>Internationalization test</h2>
      <h3>Short date: {formatDate(new Date(), localeIdentifier.locale)}</h3>
      <h3>Time: {formatTime(new Date(), localeIdentifier.locale)}</h3>
      <h3>Currency: {formatCurrency(89.99, localeIdentifier.locale)}</h3>
      <h2>Current locale</h2>
      <pre>{JSON.stringify(localeIdentifier, null, 4)}</pre>
      <h2>Locales</h2>
      <pre>{JSON.stringify(localeIdentifiersByRegion, null, 4)}</pre>
    </>
  )
}
