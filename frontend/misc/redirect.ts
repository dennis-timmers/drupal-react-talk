// import { createGraphqlRequestSdk } from './graphql-request-sdk';

interface GetRedirectReturnProps {
  redirect: {
    destination: string
    permanent: boolean
  }
}

export async function getRedirect (): Promise<GetRedirectReturnProps | null> {
  // path: string,
  // sdk: ReturnType<typeof createGraphqlRequestSdk>,
  try {
    const result = { redirect: { target: '/dest', status: 301 } }

    return {
      redirect: {
        destination: result.redirect.target,
        permanent: result.redirect.status === 301
      }
    }
  } catch (e) {
    return null
  }
}
