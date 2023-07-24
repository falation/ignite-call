import '../lib/dayjs'

import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { NextSeo } from 'next-seo'

import { queryClient } from '../lib/react-query'
import { globalStyles } from '../styles/global'

globalStyles()

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <NextSeo
          openGraph={{
            url: 'https://ignite-call.ans.com.br',
            title: 'Ignite Call: Ans',
            description: 'Ignite Call: Ans',
            siteName: 'Ignite Call: Ans',
          }}
        />

        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}
