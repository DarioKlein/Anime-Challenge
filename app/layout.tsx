import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anime Challenge',
  description: 'Site Anime Challenge',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <head>
        <title>Minha Aplicação</title>
      </head>
      <body>
        <AppRouterCacheProvider options={{ key: 'css' }}>{children}</AppRouterCacheProvider>
      </body>
    </html>
  )
}
