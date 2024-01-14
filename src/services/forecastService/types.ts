export type FiveDayWeatherForecastResponse = {
  // I omitted unused properties
  list: FiveDayWeatherForecastResponseListItem[]
}

export type FiveDayWeatherForecastResponseListItem = {
  /**
   * Probability of precipitation. The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%.
   */
  pop: number
  main: {
    /**
     * Temperature.
     */
    temp: number
  }
  /**
   * Date and time, Unix, UTC
   */
  dt: number
}
