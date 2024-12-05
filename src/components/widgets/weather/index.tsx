import { useEffect, useState } from "react"
import type { CurrentWeather } from "../../../types/weather"

const Weather = () => {
  const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null)
  useEffect(() => {
    if (weatherData) return
    ;(async () => {
      try {
        const data = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=51.509865&lon=-0.118092&appid=${import.meta.env.VITE_WEATHER_API}`,
        )
        const jsonData = await data.json()
        setWeatherData(jsonData)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [weatherData])

  return (
    <div className="flex size-48 select-none flex-col items-center justify-between rounded-xl bg-card p-3">
      {weatherData && (
        <>
          <span className="text-lg">
            {Math.round(weatherData.main.temp - 273.15)}&deg;C
          </span>
          <img
            src="https://res.cloudinary.com/stylesh/image/upload/v1733338463/nothing-new-tab/weather-icons/mfjgk2jpos0lmngvx0cb.png"
            alt="wather-icon"
            width={94}
          />
          <span>{weatherData.name}</span>
        </>
      )}
    </div>
  )
}

export default Weather
