import { Position } from '@/types'
import { api, getCommonSearchParams } from '../api'
import { CurrentWeatherResponse } from './types'

export async function fetchCurrentWeather(position: Position) {
  const response = (await api
    .get('weather', {
      searchParams: { ...getCommonSearchParams(position), units: 'metric' },
    })
    .json()) as CurrentWeatherResponse

  return response
}
