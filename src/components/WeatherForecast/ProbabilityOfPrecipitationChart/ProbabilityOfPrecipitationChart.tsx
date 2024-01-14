import { XAxis, YAxis, Legend, ResponsiveContainer, ReferenceLine, Tooltip, Area, AreaChart } from 'recharts'
import { useGeoLocation } from '../../GeoLocationProvider/GeoLocationProvider'
import { formatProbability } from '../helpers'
import { useWeatherForecastData } from '../useWeatherForecastData'
import { CustomTooltip } from '../CustomTooltip'

export const ProbabilityOfPrecipitationChart = () => {
  const { position } = useGeoLocation()

  const query = useWeatherForecastData(position)

  const name = 'Probability of Precipitation'

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl text-slate-300 font-bold">{name} 🌧️</h2>
      <ResponsiveContainer width="100%" height={450}>
        {query.isLoading ? (
          <div className="w-full h-full dark:bg-gray-800 animate-pulse rounded-md flex items-center justify-center">
            Loading...
          </div>
        ) : (
          <AreaChart data={query?.data?.processedData}>
            <XAxis xAxisId="0" dataKey="hour" interval={0} tick={{ fontSize: 9 }} />
            <XAxis xAxisId="1" dataKey="dayLabel" allowDuplicatedCategory={false} />
            <YAxis tickFormatter={formatProbability} domain={['auto', 'auto']} />
            <Legend />
            <Tooltip formatter={formatProbability} content={CustomTooltip} />

            {query.data?.dayLabels.map((dayLabel) => {
              return <ReferenceLine key={dayLabel} x={dayLabel} xAxisId="1" />
            })}

            <Area
              type="monotone"
              dataKey="pop"
              stroke="#92BAD2"
              fill="#C5E2F7"
              name={name}
              dot={{ strokeWidth: 1, r: 2 }}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
