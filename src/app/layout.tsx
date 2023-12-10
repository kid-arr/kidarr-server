import React from 'react'

import './globals.css'
import 'leaflet/dist/leaflet.css'

import type { Metadata } from 'next'
import { Sanchez } from 'next/font/google'
import NextAuthProvider from '@/lib/services/auth/provider'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import TanstackProvider from '@/components/providers/tanstack-provider'
import { Toaster } from '@/components/ui/toaster'

const font = Sanchez({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'ParentGrine Falcon',
  description: 'Laser focused on your kids',
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning={true}
    >
    <head />
    <body
      suppressHydrationWarning={true}
      className={cn(
        'min-h-screen bg-background font-sans antialiased',
        font.className,
      )}
    >
    <NextAuthProvider>
      <TanstackProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </TanstackProvider>
    </NextAuthProvider>
    </body>
    </html>
  )
}
