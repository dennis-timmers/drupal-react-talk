import React, { useState } from 'react'

export default function Props (): JSX.Element {
  const [state, setState] = useState<any>({ node: { title: 'Test' } })
  return (
    <>
      <button
        type='button'
        onClick={() => {
          throw new Error('error')
        }}
      >
        Throw
      </button>
      ;
      <button
        type='button'
        onClick={() => {
          setState(null)
        }}
      >
        Set null error
      </button>
      <h1>{state.node.title}</h1>
    </>
  )
}
