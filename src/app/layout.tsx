import type { Metadata } from 'next';
import { Newsreader, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import React from 'react';

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

export const metadata: Metadata = {
  title: 'Damian Sligo-Green | Product Owner - AI Application',
  description:
    'Damian Sligo-Green is applying for the Product Owner - AI Application role at Toitū Te Whenua Land Information New Zealand (LINZ). Showcasing experience in AI product development, government environments, and a passion for accessible land data.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased bg-white text-slate-900 selection:bg-teal-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}
