import dynamic from 'next/dynamic'
import React from 'react'

export const ArrowRight = dynamic<{ className?: string }>(
  async () => await import('@icons/arrow-right.svg'),
  {
    loading: () => <span />,
    ssr: false
  }
)

export function IconMapper (icon: string): React.ReactElement | null {
  switch (icon) {
    case 'arrow-right':
      return <ArrowRight />

    default:
      return null
  }
}
