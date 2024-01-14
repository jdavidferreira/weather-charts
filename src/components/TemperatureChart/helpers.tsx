import type { FiveDayWeatherForecastResponse } from '@/services/forecastService'
import { TransformedDataItem } from './types'
import { format } from 'date-fns'

export function processData(data?: FiveDayWeatherForecastResponse) {
  if (!data) {
    return {}
  }

  const processedData: TransformedDataItem[] = data.list.map((item) => {
    let date = new Date(item.dt * 1000)
    // trick to remove the time zone difference when formatting
    const userTimezoneOffset = date.getTimezoneOffset() * 60000
    date = new Date(date.getTime() + userTimezoneOffset)

    const dateStr = format(date, 'dd MMM yyyy')
    const hourStr = format(date, 'haaa')
    const dayLabel = format(date, 'eeee dd')

    return {
      temp: item.main.temp,
      pop: item.pop,
      date,
      dateStr,
      dayLabel,
      hourStr,
    }
  })

  return { processedData }
}
