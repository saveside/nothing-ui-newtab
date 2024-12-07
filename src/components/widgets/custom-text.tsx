import { useEffect, useRef, useState } from "react"
import { useOptionsStore } from "../../store/options"
import { getGreetings } from "../../utils/datetime"
import { parseDate } from "../../utils/datetime"
import Input from "../ui/input"

const date = new Date()

const getFirstWords = (str: string) => str.split("").splice(0, 3).join("")

export const CustomText = () => {
  const { customText, setCustomText } = useOptionsStore()
  const { enableDigitalClock: isDigitalClockEnabled, greetings } =
    useOptionsStore()

  const [openInput, setOpenInput] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const { day, month, weekDay } = parseDate(date)

  useEffect(() => {
    openInput && inputRef.current?.focus()
  }, [openInput])

  return (
    <div className="flex w-full flex-col items-start text-foreground text-lg">
      {openInput ? (
        <Input
          ref={inputRef}
          id="custom-text"
          placeholder="Type here"
          value={customText}
          onInput={(e) => setCustomText(e.currentTarget.value)}
          outline="ghost"
          className="w-full bg-background px-0 py-0 text-lg"
        />
      ) : (
        <button type="button" onClick={() => setOpenInput(true)}>
          {customText || "Click here to edit"}
        </button>
      )}
      {isDigitalClockEnabled ? (
        greetings && <span>{getGreetings(date)}</span>
      ) : (
        <span>{`${getFirstWords(weekDay)}, ${getFirstWords(month)} ${day}`}</span>
      )}
    </div>
  )
}
