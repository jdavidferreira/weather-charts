'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import styles from './page.module.css'
import { App } from '@/components/App/App'
import { GeoLocationProvider } from '@/components/GeoLocationProvider'

const queryClient = new QueryClient()

export default function Home() {
  return (
    <main className={styles.main}>
      <GeoLocationProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </GeoLocationProvider>
    </main>
  )
}
