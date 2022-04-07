import React from 'react'

declare global {
  interface Window {
    dataLayer?: Array<{
      event: string
      page: string
    }>
  }
}

/**
 * Load the GTM Head component directly after opening the <head> tag of the HTML document.
 *
 * @param props {{ containerId: string }}
 */
export function Head (props: { containerId: string }): JSX.Element {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${props.containerId}');`
      }}
    />
  )
}

/**
 * Load the GTM Body component directly after opening the <body> tag of the HTML document.
 *
 * Responsible for initializing GTM in non-script environments.
 *
 * @param props {{ containerId: string }}
 */
export function Body (props: { containerId: string }): JSX.Element {
  return (
    <noscript>
      <iframe
        title='GTM Body iFrame'
        src={`https://www.googletagmanager.com/ns.html?id=${props.containerId}`}
        height='0'
        width='0'
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}

/**
 * Registers a page view event with a certain page URl.
 *
 * Call this function upon every route change.
 *
 * @param url The url of the current page.
 */
export function pageview (page: string): void {
  if (
    typeof window === 'object' &&
    (window.dataLayer != null) &&
    Array.isArray(window.dataLayer)
  ) {
    window.dataLayer.push({
      event: 'pageview',
      page
    })
  }
}
