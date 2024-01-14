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
import { useGeoLocation } from '../../GeoLocationProvider/GeoLocationProvider'
import { formatTemperature } from '../helpers'
import { useWeatherForecastData } from '../useWeatherForecastData'

export const TemperatureChart = () => {
  const { position } = useGeoLocation()

  const query = useWeatherForecastData(position)

  const name = 'Temperature'

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl text-slate-300 font-bold">{name} ☀️</h2>
      <ResponsiveContainer width="100%" height={450}>
        {query.isLoading ? (
          <div className="w-full h-full dark:bg-gray-800 animate-pulse rounded-md flex items-center justify-center">
            Loading...
          </div>
        ) : (
          <LineChart data={query.data?.processedData}>
            <XAxis xAxisId="0" dataKey="hourLabel" interval={0} tick={{ fontSize: 9 }} />
            <XAxis xAxisId="1" dataKey="dayLabel" allowDuplicatedCategory={false} />
            <YAxis tickFormatter={formatTemperature} domain={['auto', 'auto']} />
            <Legend />
            <Tooltip formatter={formatTemperature} />

            {query.data?.dayLabels.map((dayLabel) => {
              return <ReferenceLine key={dayLabel} x={dayLabel} xAxisId="1" />
            })}

            <Line
              type="natural"
              dataKey="temp"
              stroke="#FFCC33"
              name={name}
              dot={{ strokeWidth: 1, r: 2, stroke: '#FC9601' }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
