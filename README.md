This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
The template used is [`burst-next-app`](https://github.com/burst-digital/burst-next-app)

 ## Using the npm create-app
Run `npx create-next-app . --use-npm --example https://github.com/burst-digital/burst-next-app/tree/master` to start a new Next.js project with the burst template.

## Getting Started

Set/update the following:

- [Environment files](#environment-files)
- [GraphQL](#graphQL)
- [Languages](#languages)
- [Miscellaneous](#misc)

If all is set, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Burst next app

This template is a boilerplate made for Burst projects.

### What's in the box?

This template consists of a few pre-installed npm modules we use often.

These are:

- [Axios](https://github.com/axios/axios)
- [GraphQL-request](https://github.com/prisma-labs/GraphQL-request)
- [Styled Components](https://github.com/styled-components/styled-components)
- [Styled System](https://github.com/styled-system/styled-system)
- [klot](https://gitlab.com/straighter/klot/)

### What happens on what files?

If you are familiar with next you probably can follow, if not [check nextJS docs](https://nextjs.org/docs/basic-features/pages)

- `_app.tsx` - This includes a ThemeProvider, a Head with Metadata & Favicons, and the actual content.
- `_document.tsx` - This includes the needed code to make Styled Components work, and it has the Google Tag Manager component.
- `_error.tsx` - This is a custom error page, that isn't visible in development. It print the entire stack, so very helpful.
- `error-test.tsx` - This page is useful for testing the `_error.tsx` page.
- `404.tsx` - Custom 404 page, with already some components available.
- `homepage.cms.GraphQL` - An example query for GraphQL.
- `index.tsx` - A combination of everything.

## Details

### NextJS Patch (important!)

We added a Next.js patch. This patch solves a 'problem' in Next.js regarding the revalidation. We included the npm module `patch-package` which is needed to patch the Next.js module. This patch might become obsolete when Next.js updates.
Whenever you are going to use a newer version of Next.js you must update the patch. This is achieved by running `npm patch-package next` which will update the filename of `./patches/next+10.2.3.patch`.

### GraphQL

Update `codegen.yml` if needed. Currently the WEBSITE_ORIGIN is set to cms.domain.com.
All GraphQL related stuff is commented in the `index.tsx` page. If GraphQL is set up, it should be safe to update the query and uncomment the GraphQL related stuff.

#### Example GraphQL

A query example

```graphql
query Homepage {
  homepage: route(path: "/") {
    ... on EntityCanonicalUrl {
      entity {
        ... on NodeSpecialPage {
          title
        }
      }
    }
  }
}
```

A page example

```javascript
import { HomepageQuery } from '@generated/graphql-request';
import { createGraphqlRequestSdk } from '@misc/graphql-request-sdk';

interface Props {
  homepage: HomepageQuery;
}

export const getStaticProps: GetStaticProps<Props> = async ctx => {
  const sdk = createGraphqlRequestSdk(url);

  const locale = ctx.locale ?? ctx.defaultLocale ?? '';
  const localeIdentifier = resolveLocaleIdentifier(locale);
  const path = localeIdentifier.toPath('/');
  const redirect = await getRedirect(path, sdk);

  if (redirect) {
    return redirect;
  }

  const homepage = await sdk.Homepage();

  return {
    revalidate: DEFAULT_OVERVIEW_REVALIDATE,
    props: {
      homepage,
    },
  };
};

export default function Homepage(props: Props) {
  return <p>{props.homepage.homepage.entity.title}</p>;
}
```

### Languages

You can change these values in `next.config.js` to add or remove languages.

```javascript
const defaultConfig = {
  i18n: {
    locales: [
      'en',
      'nl-nl',
      'en-nl',
      'nl-be',
      'en-be',
      'fr-be',
      'fr-fr',
      'en-fr',
    ],
    defaultLocale: 'en',
  },
};
```

### Aliases

We are using a few standard aliases in our codebase. These are not allowed to be changed, to ensure consistency in our codebases. However, you are allowed to add others.

```javascript
    "@components/*": ["components/*"],
    "@constants/*": ["constants/*"],
    "@generated/*": ["generated/*"],
    "@pages/*": ["pages/*"],
    "@i18n/*": ["i18n/*"],
    "@misc/*": ["misc/*"],
    "@lib/*": ["lib/*"]
```

### Theming

We have already set up a Theme Provider from Styled Components and a default theme in `./style-guide/default`

### CSS Variables

We have css variables in `./theme/variables.ts`. You can override them in classes, like this:

```javascript
export const CSSVariablesExample = styled('p')`
  color: var(--text-color);

  &.color__red {
    --text-color: var(--color-red-900);
  }

  &.color__blue {
    --text-color: var(--color-blue-900);
  }

  .theme__dark & {
    --text-color: var(--color-white-100);

    background-color: var(--color-black-900);
    padding: 0.3rem;
  }
`;
```

### SEO

We have a standard SEO block, that can be included in every page `<Metatags />`. This has a default initial value that comes from `./constants/default-metatags.ts`. Please update this to make sure pages have a correct default state. The Metatags component is used to override these values per page.
Warning: We use different instances of <Head>, which give some problems when changing the level of nesting of <Head>.

### Misc

Change the values in `./public/default/site.webmanifest`

### Ideas to do

- Determine if the Google Tag Manager should be removed ( see `./lib/react-gtm` )

### Scheduled to do

### Done

- ~~Add an example environment file~~
- ~~Add default meta tags~~
- ~~Add favicon~~
- ~~Add default SEO block~~
- ~~Add a robots.txt~~
- ~~Add a /images/share-image.jpg~~
- ~~Revalidation and Revalidation patch for nextjs~~
- ~~Sitemaps (api endpoint)~~
- ~~Implement a working example of css variables and add top-level theme overrides~~
- ~~Example for Google Fonts~~
- ~~Conditional Wrapper~~
- ~~React GTM~~
- ~~InternalExternalLink~~
- ~~SVGs~~
- ~~Sluggify function~~
- ~~useClientSideState~~
- ~~Middleware runner~~
- ~~GraphQL (api endpoint)~~
- ~~Breadcrumb~~
- ~~Redirect helper~~
- ~~404~~
- ~~Cookiebar~~
- ~~Performance marks~~

### Won't do

- We will not implement a state management solution as of now. This is too complex and is usually dependant of the type of project.
