import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { ClerkProvider, SignedOut } from '@clerk/nextjs';
import QueryProvider from '@/providers/query-provider';
import { SheetProvider } from '@/providers/sheet-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mocksya',
  description:
    'Mocksya is a powerful tool to help you level up your job game.  Practice for your next interview, build a standout CV, and get ready to impress!  Try Mocksya today!',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/icons/logo-1.svg',
        href: '/icons/logo-1.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/icons/logo-1.svg',
        href: '/icons/logo-1.svg',
      },
    ],
  },
  openGraph: {
    title: 'Mocksya',
    description:
      'Mocksya is a powerful tool to help you level up your job game.  Practice for your next interview, build a standout CV, and get ready to impress!  Try Mocksya today!',
    url: 'https://mocksya.com',
    images: [
      {
        url: '/icons/logo-2.svg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
        type: 'image/png',
      },
    ],
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   site: '@site_account',
  //   creator: '@individual_account',
  //   title: 'Mocksya',
  //   description:
  //     'Mocksya is a powerful tool to help you level up your job game.  Practice for your next interview, build a standout CV, and get ready to impress!  Try Mocksya today!',
  //   images: ['/path-to-og-image.png'],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <QueryProvider>
            <SheetProvider />
            <Toaster />
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
