import * as React from 'react'

interface Props {
  condition: boolean
  wrapper: (children: React.ReactNode) => React.ReactNode
  children: React.ReactNode
}

export function ConditionalWrap (props: Props): JSX.Element {
  if (props.condition) {
    return props.wrapper(props.children) as React.ReactElement<any>
  }

  return props.children as React.ReactElement<any>
}

export default ConditionalWrap
