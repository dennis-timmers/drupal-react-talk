import React from 'react'
import Document, {
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'
import { Head as GtmHead, Body as GtmBody } from '@lib/react-gtm'
import resolveGtmContainerId from '@misc/resolve-gtm-container-id'
import PerformanceMark from '@lib/react-performance-api/performance-mark/Component'
import Fonts from '@components/molecules/Fonts/Component'

export default class MyDocument extends Document {
  render (): JSX.Element {
    const containerId = resolveGtmContainerId()

    return (
      <Html>
        <Head>
          <PerformanceMark name='head-start' />

          <PerformanceMark name='gtm-start' />
          <GtmHead containerId={containerId} />
          <PerformanceMark name='gtm-end' />

          <PerformanceMark name='fonts-start' />
          <PerformanceMark name='local-fonts-start' />
          <Fonts />
          <PerformanceMark name='local-fonts-end' />

          <PerformanceMark name='google-fonts-start' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto&display=swap'
          />
          <PerformanceMark name='google-fonts-end' />

          <PerformanceMark name='fonts-end' />

          <PerformanceMark name='head-end' />
        </Head>
        <body>
          <PerformanceMark name='body-start' />

          <GtmBody containerId={containerId} />

          <PerformanceMark name='main-start' />
          <Main />
          <PerformanceMark name='main-end' />

          <PerformanceMark name='next-scripts-body-start' />
          <NextScript />
          <PerformanceMark name='next-scripts-body-end' />

          <PerformanceMark name='body-end' />
        </body>
      </Html>
    )
  }
}
