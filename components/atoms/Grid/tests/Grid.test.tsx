/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

let container: HTMLElement
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
})

describe('<ExampleTest>', () => {
  it('should render a <p> tag', () => {
    act(() => {
      render(
        <p>Hello</p>,
        container
      )
    })

    expect(container.innerHTML).toBe('<p>Hello</p>')
  })
})
