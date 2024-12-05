import { useEffect, useState } from "react"
import AnalogueClock from "./analogue-clock"
import DigitalClock from "./digital-clock"

interface ClockProps {
  clockType: "analogue" | "digital"
}

const Clock = ({ clockType }: ClockProps) => {
  const date = new Date()
  const [seconds, setSeconds] = useState(date.getSeconds())
  const [miniutes, setMiniutes] = useState(date.getMinutes())
  const [hours, setHours] = useState(date.getHours())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSecs) => {
        if (prevSecs === 59) {
          setMiniutes((prevMins) => {
            if (prevMins === 59) {
              setHours((prevHours) => (prevHours + 1) % 12)
              return 0
            }
            return (prevMins + 1) % 60
          })
          return 0
        }

        return (prevSecs + 1) % 60
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  if (clockType === "analogue") {
    return <AnalogueClock {...{ seconds, miniutes, hours }} />
  }

  return <DigitalClock {...{ seconds, miniutes, hours }} />
}

export default Clock
