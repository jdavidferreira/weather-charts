'use client'

import { useGeoLocation } from '../GeoLocationProvider'
import { AirPollutionChart } from '../AirPollutionChart'
import { TemperatureChart } from '../TemperatureChart'

export const App = () => {
  const { position } = useGeoLocation()

  return (
    <div>
      {position ? (
        <div>
          <p>Latitude: {position.latitude}</p>
          <p>Longitude: {position.longitude}</p>
          <AirPollutionChart />
          <TemperatureChart />
        </div>
      ) : (
        'Loading position...'
      )}
    </div>
  )
}
