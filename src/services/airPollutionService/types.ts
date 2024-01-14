export type DateInterval = {
  start: number
  end: number
}

export type AirPollutionResponse = {
  coord: Coordenates
  list: AirPollutionResponseListItem[]
}

export type Coordenates = {
  lon: number
  lat: number
}

export type AirPollutionResponseListItem = {
  main: {
    /**
     * Air Quality Index
     * 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.
     */
    aqi: 1 | 2 | 3 | 4 | 5
  }
  components: {
    /**
     * Сoncentration of CO (Carbon monoxide), μg/m3
     */
    co: number
    /**
     * Сoncentration of NO (Nitrogen monoxide), μg/m3
     */
    no: number
    /**
     * Сoncentration of NO2 (Nitrogen dioxide), μg/m3
     */
    no2: number
    /**
     * Сoncentration of O3 (Ozone), μg/m3
     */
    o3: number
    /**
     * Сoncentration of SO2 (Sulphur dioxide), μg/m3
     */
    so2: number
    /**
     * Сoncentration of PM2.5 (Fine particles matter), μg/m3
     */
    pm2_5: number
    /**
     * Сoncentration of PM10 (Coarse particulate matter), μg/m3
     */
    pm10: number
    /**
     * Сoncentration of NH3 (Ammonia), μg/m3
     */
    nh3: number
  }
  /**
   * Date and time, Unix, UTC
   */
  dt: number
}
