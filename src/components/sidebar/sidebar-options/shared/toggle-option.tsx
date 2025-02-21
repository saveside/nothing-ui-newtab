import clsx from "clsx"
import Switch from "~/components/switch"

interface ToggleOptionProps {
  label: string
  desc?: string
  enabled: boolean
  onChange: (state: boolean) => void
  disabled?: boolean
}

const ToggleOption = ({
  label,
  desc,
  enabled,
  onChange,
  disabled = false,
}: ToggleOptionProps) => {
  return (
    <div className="flex items-start gap-0">
      <div
        className={clsx(
          "flex w-full flex-col justify-between",
          disabled && "text-card-foreground/40",
        )}
      >
        <span>{label}</span>
        <span className="text-foreground/60 text-sm">{desc}</span>
      </div>
      <Switch {...{ enabled, onChange, disabled }} />
    </div>
  )
}

export default ToggleOption
