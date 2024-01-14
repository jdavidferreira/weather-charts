import { useQuery } from '@tanstack/react-query'
import { fetch5DayWeatherForecast } from '@/services/forecastService'
import { Position } from '@/types'
import { processData } from './helpers'

export const useWeatherForecastData = (position?: Position) =>
  useQuery({
    queryKey: ['forecast', position],
    queryFn: async () => fetch5DayWeatherForecast(position!),
    enabled: !!position,
    select: processData,
  })
