import { AirPollutionResponse, DateInterval } from './types'
import { Position } from '@/types'
import { api, getCommonSearchParams } from '../api'

type FetchHistoricalAirPollutionParams = {
  position: Position
  dateInterval: DateInterval
}

export async function fetchHistoricalAirPollution({ position, dateInterval }: FetchHistoricalAirPollutionParams) {
  const response = (await api
    .get('air_pollution/history', {
      searchParams: {
        ...getCommonSearchParams(position),
        start: dateInterval.start,
        end: dateInterval.end,
      },
    })
    .json()) as AirPollutionResponse

  return response
}
