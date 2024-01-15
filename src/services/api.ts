import ky from 'ky'
import { Position } from '../types'

export const api = ky.create({
  prefixUrl: 'https://api.openweathermap.org/data/2.5/',
})

export function getCommonSearchParams(position: Position) {
  return {
    lat: position.latitude,
    lon: position.longitude,
    appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY!,
  }
}
