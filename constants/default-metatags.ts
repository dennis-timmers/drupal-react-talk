// In case of multiple sites

export interface MetatagsProps {
  fb_app_id?: string
  title?: string
  robots?: string
  description?: string
  og_image?: string
  twitterHandler?: string
}

export const defaultTags = {
  fb_app_id: '',
  robots: '',
  title: '',
  description: '',
  og_image: `${process.env.NEXT_PUBLIC_WEBSITE_URL ?? ''}/images/share-image.jpg`,
  twitterHandler: ''
}
