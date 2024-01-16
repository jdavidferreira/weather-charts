import Image from 'next/image'
import { createColumnHelper } from '@tanstack/react-table'

import { CurrentWeatherResponse } from '@/services/currentWeatherService/types'

export const columnHelper = createColumnHelper<CurrentWeatherResponse>()

export const columns = [
  columnHelper.accessor('name', {
    header: () => 'City',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('weather', {
    header: () => 'Weather',
    cell: (info) => {
      const weather = info.getValue()

      return (
        <div className="flex flex-col gap-1">
          {weather.map((weatherItem) => {
            return (
              <p key={weatherItem.id} className="flex gap-1 items-center">
                <span className="capitalize">{weatherItem.description}</span>
                <Image
                  src={getIconUrl(weatherItem.icon)}
                  width={25}
                  height={25}
                  alt={`${weatherItem.description} icon`}
                />
              </p>
            )
          })}
        </div>
      )
    },
  }),
  columnHelper.accessor('main.temp', {
    header: () => 'Temperature',
    cell: (info) => `${info.getValue()} °C`,
  }),
  columnHelper.accessor('main.pressure', {
    header: () => 'Pressure',
    cell: (info) => `${info.getValue()} hPa`,
  }),
  columnHelper.accessor('main.humidity', {
    header: () => 'Humidity',
    cell: (info) => `${info.getValue()}%`,
  }),
  columnHelper.accessor('visibility', {
    header: () => 'Visibility',
    cell: (info) => `${info.getValue().toLocaleString()} m`,
  }),
  columnHelper.accessor('wind', {
    header: () => 'Wind',
    cell: (info) => {
      const wind = info.getValue()

      return (
        <div className="flex gap-1">
          <div title="Speed">{wind.speed} m/s</div> -
          <div title="Rotation">
            {wind.deg}°{' '}
            <span className="font-mono text-red-600" style={{ transform: `rotate(${wind.deg}deg)` }}>
              →
            </span>
          </div>
        </div>
      )
    },
  }),
]

export const getIconUrl = (icon: string) => `https://openweathermap.org/img/wn/${icon}.png` as const

export const castArray = <T,>(value: T) => [value]
