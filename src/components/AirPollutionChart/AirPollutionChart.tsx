import { useMemo, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Label,
  TooltipProps,
} from 'recharts'
import { useQuery } from '@tanstack/react-query'
import { useGeoLocation } from '../GeoLocationProvider/GeoLocationProvider'
import { fetchHistoricalAirPollution } from '@/services/api'
import { getDateInterval, processData, categoriesGraphLineDataMap, airQualityIndexMap } from './helpers'
import { Category, TransformedDataItem } from './types'

export const AirPollutionChart = () => {
  const { position } = useGeoLocation()
  const [activeCategory, setActiveCategory] = useState<Category>('co')

  const dateInterval = useMemo(() => getDateInterval(), [])

  const query = useQuery({
    queryKey: ['weather', position, dateInterval],
    queryFn: () => fetchHistoricalAirPollution({ position: position!, dateInterval }),
    enabled: !!position,
  })

  const toggleCategoryVisibility = (dataKey: Category) => {
    setActiveCategory(dataKey)
  }

  const { processedData, meta } = useMemo(() => processData(query.data), [query.data])

  return (
    <ResponsiveContainer width="100%" height={450}>
      <LineChart data={processedData}>
        <XAxis
          dataKey="dayStr"
          tick={<CustomizedAxisTick />}
          interval={0}
          label={{ value: 'Day', position: 'insideBottomRight', offset: 0 }}
        />
        <YAxis label={{ value: 'Сoncentration of CO (μg/m3)', angle: -90, position: 'insideBottomLeft', offset: 10 }} />
        <Legend
          onClick={({ dataKey }) => {
            if (typeof dataKey === 'string') {
              toggleCategoryVisibility(dataKey as Category)
            }
          }}
        />
        <Tooltip content={(props) => <CustomTooltip {...props} activeCategory={activeCategory} />} />
        {meta?.map(({ monthName, startDateOfMonthStr }, idx) => {
          return (
            <ReferenceLine key={idx} x={startDateOfMonthStr} stroke="lightgray">
              <Label value={monthName} offset={0} position="insideTop" />
            </ReferenceLine>
          )
        })}
        {Object.entries(categoriesGraphLineDataMap).map(([category, categoryGraphData]) => {
          return (
            <Line
              key={category}
              dataKey={category}
              fill={categoryGraphData.fill}
              name={categoryGraphData.name}
              hide={activeCategory !== category}
              type="linear"
              dot={false}
            />
          )
        })}
      </LineChart>
    </ResponsiveContainer>
  )
}

const CustomizedAxisTick = (props: any) => {
  const { x, y, payload } = props

  const dayNumber = Number(String(payload.value).substring(6))

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={10} textAnchor="end" fill="#666" fontSize={8}>
        {dayNumber}
      </text>
    </g>
  )
}

const CustomTooltip = (props: TooltipProps<any, any> & { activeCategory: Category }) => {
  const payload = props.payload?.[0]?.payload as TransformedDataItem

  if (!payload) {
    return null
  }

  return (
    <div>
      <p>
        {categoriesGraphLineDataMap[props.activeCategory].formattedName}: {payload[props.activeCategory]} μg/m
        <sup>3</sup>
      </p>
      <p>
        Air Quality Index: {payload.aqi} ({airQualityIndexMap[payload.aqi]})
      </p>
      <p>
        {payload.date.toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </div>
  )
}
