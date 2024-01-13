'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { App } from '@/components/App/App'
import { GeoLocationProvider } from '@/components/GeoLocationProvider'

const queryClient = new QueryClient()

export default function Home() {
  return (
    <main className="w-screen py-8 px-6">
      <GeoLocationProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </GeoLocationProvider>
    </main>
  )
}
