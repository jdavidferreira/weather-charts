import { AirPollutionResponseListItem } from '@/services/airPollutionService/types'
import { ReactNode } from 'react'

export type CategoryGraphLineData = {
  name: string
  fill: string
  formattedName: ReactNode
}

export type Category = 'co' | 'no' | 'no2' | 'o3' | 'so2' | 'pm2_5' | 'pm10' | 'nh3'

export type TransformedDataItem = {
  date: Date
  dayStr: string
  count: number
} & AirPollutionResponseListItem['components'] &
  AirPollutionResponseListItem['main']
