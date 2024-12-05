import clsx from "clsx"
import Switch from "../switch"

interface ToggleOptionProps {
  label: string
  enabled: boolean
  onChange: (state: boolean) => void
  disabled?: boolean
}

const ToggleOption = ({
  label,
  enabled,
  onChange,
  disabled = false,
}: ToggleOptionProps) => {
  return (
    <div
      className={clsx(
        "inline-flex h-full w-full justify-between",
        disabled && "text-card-foreground/40",
      )}
    >
      <span>{label}</span>
      <span className="mr-2 ml-auto h-full w-[1px] bg-card-foreground/30" />
      <Switch {...{ enabled, onChange, disabled }} />
    </div>
  )
}

export default ToggleOption
