import React, { useState } from 'react'
import classNames from 'classnames'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { nullUndefCheck } from '@misc/helpers'

enum CookieValue {
  OPTIMAL = 'optimal',
  RESTRICTED = 'restricted',
}

enum CookieStep {
  FIRST,
  SECOND,
}

function CookieMessageContent (): JSX.Element {
  return (
    <>
      <h4 className='cookie-message__title'>cookie-bar-title</h4>
      <small className='cookie-message__intro'>
        cookie-bar-description{' '}
        <a href='/'>
          <a className='cookie-message__intro-link'>check-cookie-policy</a>
        </a>
      </small>
    </>
  )
}

export function CookieMessage (): JSX.Element | null {
  const cookieName = 'default-cookie-title'
  const [cookies, setCookie] = useCookies([cookieName])
  const [activeCookieOption, setActiveCookieOption] = useState<CookieValue>(
    cookies[cookieName]
  )
  const [cookieStep, setCookieStep] = useState<CookieStep>(CookieStep.FIRST)
  const router = useRouter()

  const submitCookie = (value: CookieValue = CookieValue.RESTRICTED): void => {
    setCookie(cookieName, value, { path: '/' })
    router.push(router.asPath).finally(() => {})
  }

  if (nullUndefCheck(cookies[cookieName])) {
    return null
  }

  return (
    <>
      <div
        className={classNames({
          'cookie-message__content': true,
          'cookie-message__content--hidden': cookieStep !== CookieStep.FIRST
        })}
      >
        {CookieMessageContent()}
        <div>
          <button
            type='submit'
            onClick={() => submitCookie(CookieValue.RESTRICTED)}
          >
            accept-cookies
          </button>
          <button
            className='cookie-message__step-button'
            type='button'
            onClick={() => setCookieStep(CookieStep.SECOND)}
          >
            check-cookie-options
          </button>
        </div>
      </div>
      <div
        className={classNames({
          'cookie-message__content': true,
          'cookie-message__content--hidden': cookieStep !== CookieStep.SECOND
        })}
      >
        {CookieMessageContent()}
        <form>
          <div>
            <input
              type='radio'
              className='cookie-message__radio'
              value={CookieValue.RESTRICTED}
              onChange={() => setActiveCookieOption(CookieValue.RESTRICTED)}
            />
            <small>
              <b>cookie-bar-option-limited.</b>{' '}
              cookie-bar-option-limited-description
            </small>
          </div>
          <div>
            <input
              type='radio'
              className='cookie-message__radio cookie-message__radio'
              value={CookieValue.OPTIMAL}
              onChange={() => setActiveCookieOption(CookieValue.OPTIMAL)}
            />
            <small>
              <b>cookie-bar-option-optimal.</b>{' '}
              cookie-bar-option-optimal-description
            </small>
          </div>
          <button
            type='submit'
            onClick={() => submitCookie(activeCookieOption)}
          >
            accept-cookies
          </button>
        </form>
      </div>
    </>
  )
}
