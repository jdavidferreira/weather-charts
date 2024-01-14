import type { FiveDayWeatherForecastResponse } from '@/services/forecastService'
import { TransformedDataItem } from './types'
import { format } from 'date-fns'

export function processData(data?: FiveDayWeatherForecastResponse) {
  if (!data) {
    return {
      processedData: [],
      dayLabels: [],
    }
  }

  // to add the ReferenceLines
  const dayLabelSet: Set<string> = new Set()

  const processedData: TransformedDataItem[] = data.list.map((item) => {
    let date = new Date(item.dt * 1000)
    // trick to remove the time zone difference when formatting
    const userTimezoneOffset = date.getTimezoneOffset() * 60000
    date = new Date(date.getTime() + userTimezoneOffset)

    const dayLabel = format(date, 'eeee dd')
    const hourLabel = format(date, 'haaa')

    dayLabelSet.add(dayLabel)

    return {
      temp: item.main.temp,
      pop: item.pop * 100,
      date,
      dayLabel,
      hourLabel,
    }
  })

  return { processedData, dayLabels: Array.from(dayLabelSet) }
}

export function formatTemperature(temp: string) {
  return `${temp} C°` as const
}

export function formatProbability(percentage: string) {
  return `${percentage}%` as const
}
