import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ErrorProvider } from '@/context/ErrorContext'
import { LoaderProvider } from '@/context/LoaderContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `sheetz`,
  description: 'Cut the grunt work out of lead generation'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-[100vw] h-[100vh]`}>
        <ErrorProvider>
          <LoaderProvider>
          {children}
          </LoaderProvider>
        </ErrorProvider>
      </body>
    </html>
  )
}
