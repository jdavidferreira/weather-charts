import { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { useQuery } from '@tanstack/react-query'
import { useGeoLocation } from '../GeoLocationProvider/GeoLocationProvider'
import { fetch5DayWeatherForecast } from '@/services/forecastService'
import { processData } from './helpers'
import { range } from 'lodash'

export const TemperatureChart = () => {
  const { position } = useGeoLocation()

  const query = useQuery({
    queryKey: ['weather', position],
    queryFn: () => fetch5DayWeatherForecast(position!),
    enabled: !!position,
  })

  const { processedData } = useMemo(() => processData(query.data), [query.data])

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl text-slate-300 font-bold">Temperature</h2>
      <ResponsiveContainer width="100%" height={450}>
        {query.isLoading ? (
          <div className="w-full h-full dark:bg-gray-800 animate-pulse rounded-md flex items-center justify-center">
            Loading...
          </div>
        ) : (
          <LineChart data={processedData}>
            <XAxis xAxisId="0" dataKey="hourStr" />
            <XAxis xAxisId="1" dataKey="dayLabel" allowDuplicatedCategory={false} />
            <YAxis tickFormatter={(value) => `${value} C°`} />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip formatter={(value, name, props) => `${value} C°`} />

            {range(5).map((num) => {
              return <ReferenceLine key={num} x={num == 0 ? 7 : num * 8 + 7} />
            })}

            <Line type="linear" dataKey="temp" fill="#82ca9d" name="Temperature" dot={{ strokeWidth: 1, r: 2 }} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
