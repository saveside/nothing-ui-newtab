import clsx from "clsx"
import Switch from "../../../switch"

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
        "inline-flex w-full justify-between",
        disabled && "text-card-foreground/40",
      )}
    >
      <span>{label}</span>
      <Switch {...{ enabled, onChange, disabled }} />
    </div>
  )
}

export default ToggleOption
