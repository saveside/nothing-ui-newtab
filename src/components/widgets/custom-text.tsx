import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import { useOptionsStore } from "../../store/options"
import { getGreetings } from "../../utils/datetime"
import { parseDate } from "../../utils/datetime"

const date = new Date()

const getFirstWords = (str: string) => str.split("").splice(0, 3).join("")
const textPlaceHolder = "Click here to edit"

export const CustomText = () => {
  const { customText, setCustomText } = useOptionsStore()
  const {
    enableDigitalClock: isDigitalClockEnabled,
    greetings,
    isBgImage,
  } = useOptionsStore()

  const [openInput, setOpenInput] = useState(false)

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const hiddenSpanRef = useRef<HTMLSpanElement>(null)

  const { day, month, weekDay } = parseDate(date)

  useEffect(() => {
    openInput && inputRef.current?.focus()
  }, [openInput])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`

      if (parentRef.current && hiddenSpanRef.current) {
        const parentWidth = parentRef.current.scrollWidth
        const textWidth = hiddenSpanRef.current.scrollWidth

        const newWidth = Math.min(Math.max(textWidth + 40, 50), parentWidth)
        inputRef.current.style.width = `${newWidth}px`
      }
    }
  }, [customText])

  return (
    <div
      ref={parentRef}
      className={clsx(
        "flex w-full flex-col items-start text-foreground text-lg",
        isBgImage && "space-y-2",
      )}
    >
      <span className="invisible" ref={hiddenSpanRef}>
        {customText || textPlaceHolder}
      </span>
      <textarea
        ref={inputRef}
        id="custom-text"
        placeholder={textPlaceHolder}
        value={customText}
        onInput={(e) => setCustomText(e.currentTarget.value)}
        onBlur={() => setOpenInput(false)}
        spellCheck={false}
        rows={1}
        className={clsx(
          "resize-none overflow-hidden rounded-xl border-none bg-card px-2 py-1 text-foreground text-lg transition-all placeholder:text-foreground focus:border-none focus:ring-0",
        )}
      />
      {isDigitalClockEnabled ? (
        greetings && (
          <span className="rounded-xl bg-card px-2 py-1">
            {getGreetings(date)}
          </span>
        )
      ) : (
        <span className="rounded-xl bg-card px-2 py-1">{`${getFirstWords(weekDay)}, ${getFirstWords(month)} ${day}`}</span>
      )}
    </div>
  )
}
