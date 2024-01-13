'use client'

import { useGeoLocation } from '../GeoLocationProvider'
import { AirPollutionChart } from '../AirPollutionChart'

export const App = () => {
  const { position } = useGeoLocation()

  return (
    <div>
      {position ? (
        <div>
          <p>Latitude: {position.latitude}</p>
          <p>Longitude: {position.longitude}</p>
          <AirPollutionChart />
        </div>
      ) : (
        'Loading position...'
      )}
    </div>
  )
}
