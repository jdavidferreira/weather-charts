import { ReactNode } from 'react'

export type Position = {
  latitude: number
  longitude: number
}

export type GeoLocationContextValue = {
  position: Position | null
}

export type GeoLocationProviderProps = {
  children?: ReactNode
}
