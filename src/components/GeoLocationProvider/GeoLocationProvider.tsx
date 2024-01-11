'use client'

import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import { GeoLocationContextValue, GeoLocationProviderProps } from './types'
import { Position } from '@/types'

const GeoLocationContext = createContext<GeoLocationContextValue>({
  position: null,
})

export const GeoLocationProvider = ({ children }: GeoLocationProviderProps) => {
  const [position, setPosition] = useState<Position | null>(null)

  useEffect(() => {
    const getCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition(
        (geoPosition) => {
          setPosition({
            latitude: geoPosition.coords.latitude,
            longitude: geoPosition.coords.longitude,
          })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }

    getCurrentPosition()
  }, [])

  const contextValue = useMemo(() => ({ position }), [position])

  return (
    <GeoLocationContext.Provider value={contextValue}>
      {children}
    </GeoLocationContext.Provider>
  )
}

export const useGeoLocation = () => {
  const context = useContext(GeoLocationContext)

  if (!context) {
    throw new Error(
      `useGeoLocation must be used within a ${GeoLocationProvider.name}`
    )
  }

  return context
}
