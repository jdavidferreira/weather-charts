import { AirPollutionResponse, AirPollutionResponseListItem } from '@/services/airPollutionService/types'
import { parse, format, subMonths, startOfDay } from 'date-fns'
import { Category, CategoryGraphLineData, TransformedDataItem } from './types'

export function processData(data?: AirPollutionResponse) {
  if (!data) {
    return {
      processedData: [],
      meta: [],
    }
  }
  console.time('processing')

  const dataByDay: Record<string, TransformedDataItem> = {}
  const meta: {
    startDateOfMonthStr: string
    monthName: string
  }[] = []

  data.list.forEach((item) => {
    const date = parse(String(item.dt), 't', new Date())
    const dayStr = format(date, 'yyyyMMdd')
    const formattedDate = date.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    const isFirstDayOfMonth = date.getDate() === 1

    if (isFirstDayOfMonth) {
      meta.push({ startDateOfMonthStr: dayStr, monthName: format(date, 'MMMM') })
    }

    if (!dataByDay[dayStr]) {
      dataByDay[dayStr] = {
        date,
        dayStr,
        formattedDate,
        count: 1,
        aqi: item.main.aqi,
        co: item.components.co,
        no: item.components.no,
        no2: item.components.no2,
        o3: item.components.o3,
        so2: item.components.so2,
        pm2_5: item.components.pm2_5,
        pm10: item.components.pm10,
        nh3: item.components.nh3,
      }
    } else {
      dataByDay[dayStr].count++
      dataByDay[dayStr].aqi += item.main.aqi
      dataByDay[dayStr].co += item.components.co
      dataByDay[dayStr].no += item.components.no
      dataByDay[dayStr].no2 += item.components.no2
      dataByDay[dayStr].o3 += item.components.o3
      dataByDay[dayStr].so2 += item.components.so2
      dataByDay[dayStr].pm2_5 += item.components.pm2_5
      dataByDay[dayStr].pm10 += item.components.pm10
      dataByDay[dayStr].nh3 += item.components.nh3
    }
  })

  Object.values(dataByDay).forEach((dayData) => {
    dayData.aqi = Math.round(dayData.aqi / dayData.count) as AirPollutionResponseListItem['main']['aqi']
    dayData.co = Math.round(dayData.co / dayData.count)
    dayData.no = Math.round(dayData.no / dayData.count)
    dayData.no2 = Math.round(dayData.no2 / dayData.count)
    dayData.o3 = Math.round(dayData.o3 / dayData.count)
    dayData.so2 = Math.round(dayData.so2 / dayData.count)
    dayData.pm2_5 = Math.round(dayData.pm2_5 / dayData.count)
    dayData.pm10 = Math.round(dayData.pm10 / dayData.count)
    dayData.nh3 = Math.round(dayData.nh3 / dayData.count)
  })

  console.timeEnd('processing')

  return {
    processedData: Object.values(dataByDay),
    meta,
  }
}

export function getDateInterval() {
  const currentDate = new Date()
  const threeMonthsAgo = startOfDay(subMonths(currentDate, 3))

  const start = Math.floor(threeMonthsAgo.getTime() / 1000)
  const end = Math.floor(currentDate.getTime() / 1000)

  return { start, end }
}

export const categoriesGraphLineDataMap: Record<Category, CategoryGraphLineData> = {
  co: {
    name: 'CO',
    formattedName: 'CO',
    fill: 'FF0000',
  },
  no: {
    name: 'NO',
    formattedName: 'NO',
    fill: '00FF00',
  },
  no2: {
    name: 'NO2',
    formattedName: (
      <span>
        NO<sub>2</sub>
      </span>
    ),
    fill: 'FF0000',
  },
  o3: {
    name: 'O3',
    formattedName: (
      <>
        O<sub>3</sub>
      </>
    ),
    fill: 'FFFF00',
  },
  so2: {
    name: 'SO2',
    formattedName: (
      <>
        SO<sub>2</sub>
      </>
    ),
    fill: '800080',
  },
  pm2_5: {
    name: 'PM2.5',
    formattedName: (
      <>
        PM<sub>2.5</sub>
      </>
    ),
    fill: '00FFFF',
  },
  pm10: {
    name: 'PM10',
    formattedName: (
      <>
        PM<sub>10</sub>
      </>
    ),
    fill: 'FFA500',
  },
  nh3: {
    name: 'NH3',
    formattedName: (
      <>
        NH<sub>3</sub>
      </>
    ),
    fill: 'FFC0CB',
  },
}

export const airQualityIndexMap = {
  1: 'Good',
  2: 'Fair',
  3: 'Moderate',
  4: 'Poor',
  5: 'Very Poor.',
}
