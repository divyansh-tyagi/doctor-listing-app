import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Apollo247 - Book Doctors Online',
  description: 'Book appointments with top General Physicians and Internal Medicine specialists near you. Consult doctors online or in-person.',
  keywords: 'doctor appointment, general physician, internal medicine, online doctor consultation, book doctor',
  openGraph: {
    title: 'Apollo247 - Book Doctors Online',
    description: 'Book appointments with top General Physicians and Internal Medicine specialists near you.',
    url: 'https://your-deployed-url.com',
    siteName: 'Apollo247',
    images: [
      {
        url: 'https://your-deployed-url.com/og-image.jpg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apollo247 - Book Doctors Online',
    description: 'Book appointments with top General Physicians and Internal Medicine specialists near you.',
    images: ['https://your-deployed-url.com/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback = {<div>Loading...</div>}>
        {children}
        </Suspense>
        </body>
    </html>
  );
}