import React from 'react'
import useBreadcrumb from '@lib/use-breadcrumb'
import InternalOrExternalLink from '@lib/link/Component'

export default function Breadcrumb (): JSX.Element | null {
  const breadcrumb = useBreadcrumb()

  // Don't show on home
  if (breadcrumb.length === 1) {
    return null
  }

  return (
    <nav>
      <ol className='breadcrumb__list'>
        {breadcrumb.map((crumb, index) => {
          return (
            <li
              key={`bread-crumb--${crumb.crumb}`}
              className='breadcrumb__list-item'
            >
              {crumb.isActive ? (
                <span>{crumb.title}</span>
              ) : (
                <InternalOrExternalLink href={crumb.crumb}>
                  {index === 0 ? <>Home</> : <>{crumb.title}</>}
                </InternalOrExternalLink>
              )}
              {index !== breadcrumb.length - 1 && (
                <p className='breadcrumb__separator'>&nbsp; /</p>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
