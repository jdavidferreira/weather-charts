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

export async function fetchCurrentAirPollution(position: Position) {
  const response = await api
    .get('air_pollution', {
      searchParams: getCommonSearchParams(position),
    })
    .json()

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
