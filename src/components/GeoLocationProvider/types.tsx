import { ReactNode } from 'react'
import { Position } from '@/types'

export type GeoLocationContextValue = {
  position: Position | null
}

export type GeoLocationProviderProps = {
  children?: ReactNode
}
