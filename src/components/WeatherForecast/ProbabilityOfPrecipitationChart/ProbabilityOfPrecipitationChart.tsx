import { XAxis, YAxis, Legend, ResponsiveContainer, ReferenceLine, Tooltip, Area, AreaChart } from 'recharts'
import { useGeoLocation } from '../../GeoLocationProvider/GeoLocationProvider'
import { formatProbability } from '../helpers'
import { useWeatherForecastData } from '../useWeatherForecastData'
import { CustomTooltip } from '../CustomTooltip'
import { LoadingBox } from '@/components/LoadingBox'
import { SectionContainer } from '@/components/SectionContainer'

export const ProbabilityOfPrecipitationChart = () => {
  const { position } = useGeoLocation()

  const query = useWeatherForecastData(position)

  const name = 'Probability of Precipitation'

  return (
    <SectionContainer title={`${name} 🌧️`} titleClassName="text-lg">
      <ResponsiveContainer width="100%" height={450}>
        {query.isLoading ? (
          <LoadingBox />
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
    </SectionContainer>
  )
}
