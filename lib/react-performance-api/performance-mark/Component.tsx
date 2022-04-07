import React from 'react'

export default function PerformanceMark (props: { name: string }): JSX.Element {
  return (
    <script
      type='application/javascript'
      // eslint-disable-next-line
      dangerouslySetInnerHTML={{ __html: `performance.mark("${props.name}")` }}
    />
  )
}
