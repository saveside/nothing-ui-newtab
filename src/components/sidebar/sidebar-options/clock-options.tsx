import { useOptionsStore } from "../../../store/options"
import ToggleOption from "../toggle-option"

const ClockOptions = () => {
  const {
    enableDigitalClock,
    toggleDidigtalClock,
    format24,
    toggleFormat24,
    greetings,
    toggelGreetings,
  } = useOptionsStore()
  return (
    <div className="flex w-full flex-col gap-3">
      <span className="font-medium text-sm">Clock</span>
      <ToggleOption
        label="Digital clock"
        enabled={enableDigitalClock}
        onChange={toggleDidigtalClock}
      />
      <ToggleOption
        label="24 hours format"
        enabled={format24}
        onChange={toggleFormat24}
        disabled={!enableDigitalClock}
      />
      <ToggleOption
        label="Greeting message"
        enabled={greetings}
        onChange={toggelGreetings}
        disabled={!enableDigitalClock}
      />
    </div>
  )
}

export default ClockOptions
