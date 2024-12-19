import type React from "react"
import Button from "~/components/ui/button"

interface AppCardProps {
  icon: string
  children: React.ReactNode
  delFunc: () => void
}

const AppCard = ({ icon, children, delFunc }: AppCardProps) => {
  return (
    <div className="relative flex flex-col items-center rounded-xl bg-background p-4">
      <Button size="icon" className="size-14 shrink-0" icon={icon} />
      <div className="flex w-full flex-col space-y-2 pt-6">{children}</div>
      <Button
        variant="secondary"
        icon="mdi:trash-outline"
        size="icon"
        className="absolute top-3 right-3 size-8"
        onClick={delFunc}
      />
    </div>
  )
}
export default AppCard
