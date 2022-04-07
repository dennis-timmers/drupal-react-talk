import Head from 'next/head'
import React from 'react'

// In case of multiple sites

// import { Site } from '@constants/site';
// const site = Site.default;
// switch (site) {
//   default:
//   case Site.default: {
//   }
// }

// Refer to: https://realfavicongenerator.net/
export default function Favicons (): JSX.Element {
  return (
    <Head>
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/default/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/default/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/default/favicon-16x16.png'
      />
      <link rel='manifest' href='/default/site.webmanifest' />
      <link
        rel='mask-icon'
        href='/default/safari-pinned-tab.svg'
        color='#5bbad5'
      />
      <link rel='shortcut icon' href='/default/favicon.ico' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-config' content='/default/browserconfig.xml' />
      <meta name='theme-color' content='#ffffff' />
    </Head>
  )
}
