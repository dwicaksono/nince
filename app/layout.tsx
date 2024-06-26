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
