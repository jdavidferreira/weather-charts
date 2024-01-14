'use client'

import { useGeoLocation } from '../GeoLocationProvider'
import { AirPollutionChart } from '../AirPollutionChart'
import { TemperatureChart } from '../WeatherForecast/TemperatureChart'
import { ProbabilityOfPrecipitationChart } from '../WeatherForecast/ProbabilityOfPrecipitationChart'

export const App = () => {
  const { position } = useGeoLocation()

  return (
    <div>
      {position ? (
        <div>
          <p>Latitude: {position.latitude}</p>
          <p>Longitude: {position.longitude}</p>
          <div className="flex flex-col gap-6">
            <AirPollutionChart />
            <div className="grid grid-cols-2 gap-6">
              <TemperatureChart />
              <ProbabilityOfPrecipitationChart />
            </div>
          </div>
        </div>
      ) : (
        'Loading position...'
      )}
    </div>
  )
}
