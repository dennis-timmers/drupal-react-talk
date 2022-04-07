import React from 'react'
import DefaultMetatags from '@components/molecules/DefaultMetatags/Component'
import Favicons from '@components/molecules/Favicons/Component'
import { usePageView } from '@lib/react-gtm/next/use-page-view'
import Breadcrumb from '@components/molecules/Breadcrumb/Component'
import { AppProps } from 'next/dist/shared/lib/router/router'
import '../theme/main.css'

export default function App (props: AppProps): JSX.Element {
  usePageView()
  return (
    <>
      <Breadcrumb />
      <props.Component {...props.pageProps} />

      <DefaultMetatags />
      <Favicons />
    </>
  )
}
