import { Position } from '@/types'
import { api, getCommonSearchParams } from '../api'
import { FiveDayWeatherForecastResponse } from './types'

export async function fetch5DayWeatherForecast(position: Position) {
  const response = (await api
    .get('forecast', {
      searchParams: { ...getCommonSearchParams(position), units: 'metric' },
    })
    .json()) as FiveDayWeatherForecastResponse

  return response
}
