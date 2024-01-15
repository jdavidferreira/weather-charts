'use client'

import { useGeoLocation } from '../GeoLocationProvider'
import { AirPollutionChart } from '../AirPollutionChart'
import { TemperatureChart } from '../WeatherForecast/TemperatureChart'
import { ProbabilityOfPrecipitationChart } from '../WeatherForecast/ProbabilityOfPrecipitationChart'
import { CurrentWeatherTable } from '../CurrentWeatherTable/CurrentWeatherTable'

export const App = () => {
  const { position } = useGeoLocation()

  return (
    <div>
      {position ? (
        <div>
          <p>Latitude: {position.latitude}</p>
          <p>Longitude: {position.longitude}</p>
          <CurrentWeatherTable />
        </div>
      ) : (
        'Loading position...'
      )}
    </div>
  )
}
