import React, { useRef } from 'react'
import { NextPageContext } from 'next'
import Error from 'next/error'
import cleanStack from 'clean-stack'
import { nullUndefCheck } from '@misc/helpers'

function loadStackTrace (html: HTMLElement): void {
  import('highlight.js').then(mod => mod.highlightBlock(html)).finally(() => {})
}
function ErrorStatus (props: ReturnType<typeof getInitialProps>): JSX.Element {
  const ref = useRef<any>()

  return (
    <>
      <Error statusCode={props.statusCode ?? 400} />

      {/* Check if debugging mode is enabled. */}
      {nullUndefCheck(props.stack) && (
        <>
          <link
            href={require('highlight.js/styles/github.css')}
            rel='stylesheet'
          />
          <details
            onClick={() => {
              loadStackTrace(ref.current)
            }}
          >
            <summary>Stack trace</summary>
            <pre>
              <code
                className='js'
                style={{
                  borderRadius: 4,
                  padding: 24,
                  margin: 24,
                  width: 'calc(100% - 96px)'
                }}
                ref={ref}
              >
                {cleanStack(props.stack ?? '')}
              </code>
            </pre>
          </details>
        </>
      )}
    </>
  )
}

interface GetInitialPropsReturnProps {
  statusCode: number | undefined
  stack: string | undefined
}

function getInitialProps (props: NextPageContext): GetInitialPropsReturnProps {
  const statusCode = (props.res != null)
    ? props.res.statusCode
    : (props.err != null)
      ? props.err.statusCode
      : 404
  return { statusCode, stack: props.err?.stack }
}

ErrorStatus.getInitialProps = getInitialProps

export default ErrorStatus
