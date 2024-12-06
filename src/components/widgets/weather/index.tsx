import { useEffect, useMemo, useState } from "react"
import { icons } from "../../../lib/icons"
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

  const weatherIcon = useMemo(() => {
    const hours = new Date().getHours()
    const isDay = hours <= 18 && hours > 6
    const altImg = `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`

    const status = weatherData?.weather[0].main.toLowerCase()
    if (!status) return altImg

    return (
      // biome-ignore lint/suspicious/noExplicitAny: <too much work>
      (icons.weather_icons as any)[status]?.[isDay ? "day" : "night"] || altImg
    )
  }, [weatherData])

  return (
    <div className="flex size-48 select-none flex-col items-center justify-between rounded-xl bg-card p-3">
      {weatherData && (
        <>
          <span className="text-lg">
            {Math.round(weatherData.main.temp - 273.15)}&deg;C
          </span>
          <img src={weatherIcon} alt="wather-icon" width={78} />
          <span>{weatherData.name}</span>
        </>
      )}
    </div>
  )
}

export default Weather
