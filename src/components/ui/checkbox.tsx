import type { Setter } from "~/types/react"

interface CheckboxProps {
  id: string
  label: string
  checked: boolean
  setChecked: Setter<boolean>
}

export default function Checkbox({
  id,
  label,
  checked,
  setChecked,
}: CheckboxProps) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        className="shrink-0 rounded border-foreground/20 bg-background text-destructive focus:ring-foreground disabled:pointer-events-none disabled:opacity-50"
        onChange={(e) => setChecked(e.target.checked)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
