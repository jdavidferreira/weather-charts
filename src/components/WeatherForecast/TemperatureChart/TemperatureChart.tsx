import { LineChart, Line, XAxis, YAxis, Legend, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts'
import { useGeoLocation } from '../../GeoLocationProvider/GeoLocationProvider'
import { formatTemperature } from '../helpers'
import { useWeatherForecastData } from '../useWeatherForecastData'
import { CustomTooltip } from '../CustomTooltip'
import { LoadingBox } from '@/components/LoadingBox'
import { SectionContainer } from '@/components/SectionContainer'

export const TemperatureChart = () => {
  const { position } = useGeoLocation()

  const query = useWeatherForecastData(position)

  const name = 'Temperature'

  return (
    <SectionContainer title={`${name} ☀️`} titleClassName="text-lg">
      <ResponsiveContainer width="100%" height={450}>
        {query.isLoading ? (
          <LoadingBox />
        ) : (
          <LineChart data={query.data?.processedData}>
            <XAxis xAxisId="0" dataKey="hour" interval={0} tick={{ fontSize: 9 }} />
            <XAxis xAxisId="1" dataKey="dayLabel" allowDuplicatedCategory={false} />
            <YAxis tickFormatter={formatTemperature} domain={['auto', 'auto']} />
            <Legend />
            <Tooltip formatter={formatTemperature} content={CustomTooltip} />

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
    </SectionContainer>
  )
}
