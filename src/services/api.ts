import ky from 'ky'
import { Position } from '../types'
import { AirPollutionResponse, DateInterval } from './types'

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

export async function fetch5DayWeatherForecast(position: Position) {
  const response = await api
    .get('forecast', {
      searchParams: getCommonSearchParams(position),
    })
    .json()

  return response
}

export async function fetchCurrentWeather(position: Position) {
  const response = await api
    .get('weather', {
      searchParams: getCommonSearchParams(position),
    })
    .json()

  return response
}
