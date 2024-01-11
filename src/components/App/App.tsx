'use client'
import { useGeoLocation } from '../GeoLocationProvider/GeoLocationProvider'

export const App = () => {
  const { position } = useGeoLocation()

  return (
    <div>
      {position ? (
        <div>
          <p>Latitude: {position.latitude}</p>
          <p>Longitude: {position.longitude}</p>
        </div>
      ) : (
        'Loading position...'
      )}
    </div>
  )
}