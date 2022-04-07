import React from 'react'

export default function Fonts (): JSX.Element {
  return (
    <style
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `@font-face {
        font-family: 'avenir-next';
        src: url('/fonts/AvenirNext-Regular.woff2') format('woff2'),
          url('/fonts/AvenirNext-Regular.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }`
      }}
    />
  )
}
