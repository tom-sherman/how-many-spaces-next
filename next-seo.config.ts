import type { NextSeoProps } from 'next-seo';

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  title: 'Live car parking information for Norwich',
  description: 'See in real time how many parking spaces are available in the car parks and park and ride sites around Norwich, Norfolk.',
  canonical: process.env.NEXT_PUBLIC_URL,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: process.env.NEXT_PUBLIC_URL,
    title: 'Live car parking information for Norwich',
    description: 'See in real time how many parking spaces are available in the car parks and park and ride sites around Norwich, Norfolk.',
    images: [
      {
        url: '/share.png',
        width: 1200,
        height: 630,
        alt: 'How Many Spaces? | Norwich',
        type: 'image/png',
        secureUrl: `${process.env.NEXT_PUBLIC_URL}/share.png`,
      },
    ],
    siteName: 'How Many Spaces? | Norwich',
  },
  twitter: {
    handle: '@Andrew_Haine',
    cardType: 'summary',
  },
  titleTemplate: "%s | How Many Spaces?"
};