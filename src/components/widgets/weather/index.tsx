import { useEffect, useMemo, useState } from "react"
import { icons } from "../../../lib/icons"
import { useOptionsStore } from "../../../store/options"
import type { CurrentWeather } from "../../../types/weather"

const Weather = () => {
  const { weatherAPI, weatherLocation, isScaleFahrenheit, isLightMode } =
    useOptionsStore()

  const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null)
  useEffect(() => {
    if (weatherData) return
    ;(async () => {
      try {
        const data = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${weatherLocation}&appid=${weatherAPI || import.meta.env.VITE_WEATHER_API}`,
        )
        if (data.ok) {
          const jsonData = await data.json()
          setWeatherData(jsonData)
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [weatherData, weatherAPI, weatherLocation])

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
    <div className="flex size-48 select-none flex-col items-center justify-between rounded-xl bg-card p-3 text-card-foreground">
      {weatherData ? (
        <>
          <span className="text-lg">
            {isScaleFahrenheit
              ? convertFromKelvin(weatherData.main.temp, "F")
              : convertFromKelvin(weatherData.main.temp, "C")}
            &deg;{isScaleFahrenheit ? "F" : "C"}
          </span>
          <img
            src={weatherIcon}
            alt="wather-icon"
            width={78}
            style={isLightMode ? { filter: "invert(1)" } : {}}
          />
          <span>{weatherData.name}</span>
        </>
      ) : (
        <span className="flex h-full items-center justify-center text-center">
          Make sure your given location and API Key is valid
        </span>
      )}
    </div>
  )
}

function convertFromKelvin(kelvin: number, to: "F" | "C") {
  const celcious = kelvin - 273.15
  if (to === "F") {
    return Math.round((celcious * 9) / 5 + 32)
  }
  return Math.round(celcious)
}

export default Weather
