import { ReactNode } from 'react'
import { Position } from '@/types'

export type GeoLocationContextValue = {
  position?: Position
}

export type GeoLocationProviderProps = {
  children?: ReactNode
}
