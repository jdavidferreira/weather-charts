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
import { fetchHistoricalAirPollution } from '@/services/airPollutionService'
import { getDateInterval, processData, categoriesGraphLineDataMap, airQualityIndexMap } from './helpers'
import { Category, TransformedDataItem } from './types'
import { LoadingBox } from '../LoadingBox'

export const AirPollutionChart = () => {
  const { position } = useGeoLocation()
  const [activeCategory, setActiveCategory] = useState<Category>('co')

  const dateInterval = useMemo(() => getDateInterval(), [])

  const query = useQuery({
    queryKey: ['weather', position, dateInterval],
    queryFn: () => fetchHistoricalAirPollution({ position: position!, dateInterval }),
    enabled: !!position,
    select: processData,
  })

  const toggleCategoryVisibility = (dataKey: Category) => {
    setActiveCategory(dataKey)
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl text-slate-300 font-bold">Air Pollution in the last 3 months 💨</h2>
      <ResponsiveContainer width="100%" height={450}>
        {query.isLoading ? (
          <LoadingBox />
        ) : (
          <LineChart data={query.data?.processedData}>
            <XAxis
              dataKey="dayStr"
              tick={<CustomizedAxisTick />}
              interval={0}
              label={{ value: 'Day', position: 'insideBottomRight', offset: 0 }}
            />
            <YAxis
              label={{ value: 'Сoncentration of CO (μg/m3)', angle: -90, position: 'insideBottomLeft', offset: 10 }}
              domain={['auto', 'auto']}
            />
            <Legend
              onClick={({ dataKey }) => {
                if (typeof dataKey === 'string') {
                  toggleCategoryVisibility(dataKey as Category)
                }
              }}
            />
            <Tooltip content={(props) => <CustomTooltip {...props} activeCategory={activeCategory} />} />
            {query.data?.meta.map(({ monthName, startDateOfMonthStr }, idx) => {
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
                  dot={{ strokeWidth: 1, r: 2 }}
                />
              )
            })}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
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
    <div className="rounded-sm bg-gray-700 p-2">
      <p>
        {categoriesGraphLineDataMap[props.activeCategory].formattedName}: {payload[props.activeCategory]} μg/m
        <sup>3</sup>
      </p>
      <p>
        Air Quality Index: {payload.aqi} ({airQualityIndexMap[payload.aqi]})
      </p>
      <p>{payload.formattedDate}</p>
    </div>
  )
}
