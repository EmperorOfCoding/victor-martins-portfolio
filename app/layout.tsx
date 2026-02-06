import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Engineer Portfolio | Cosmic Developer',
  description: 'Full-stack software engineer crafting stellar digital experiences across the universe of web development',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light.svg',
        media: '(prefers-color-scheme: light)',
        type: 'image/svg+xml',
      },
      {
        url: '/icon-dark.svg',
        media: '(prefers-color-scheme: dark)',
        type: 'image/svg+xml',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children;
}
