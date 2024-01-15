'use client'

import { useGeoLocation } from './GeoLocationProvider'
import { AirPollutionChart } from './AirPollutionChart'
import { TemperatureChart } from './WeatherForecast/TemperatureChart'
import { ProbabilityOfPrecipitationChart } from './WeatherForecast/ProbabilityOfPrecipitationChart'
import { CurrentWeatherTable } from './CurrentWeatherTable/CurrentWeatherTable'
import { SectionContainer } from './SectionContainer'

export const App = () => {
  const { position } = useGeoLocation()

  return (
    <div>
      {position ? (
        <div className="relative">
          <div className="absolute top-0 right-0 text-sm">
            <h4 className="font-bold">Coordenates</h4>
            <p>Latitude: {position.latitude}</p>
            <p>Longitude: {position.longitude}</p>
          </div>
          <h1 className="text-4xl text-center mb-8">Weather Information</h1>
          <div className="flex flex-col gap-7">
            <AirPollutionChart />
            <SectionContainer title="5 day Weather forecast">
              <div className="grid grid-cols-2 gap-7">
                <TemperatureChart />
                <ProbabilityOfPrecipitationChart />
              </div>
            </SectionContainer>
          </div>
          <CurrentWeatherTable />
        </div>
      ) : (
        'Loading position...'
      )}
    </div>
  )
}
