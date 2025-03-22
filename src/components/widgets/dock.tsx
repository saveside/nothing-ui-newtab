import clsx from "clsx"
import { useAppStore } from "~/store/app-store"
import { useOptionsStore } from "~/store/options"
import { ensureHttpPrefix } from "~/utils"
import * as Motion from "../motion-primitives/dock"
import AppIcon from "../ui/app-icon"

interface DockItemProps {
  icon: string
  name: string
  isDockBg?: boolean
  onClick: () => void
}
const DockItem = ({ icon, name, isDockBg, onClick }: DockItemProps) => {
  return (
    <Motion.DockItem
      className={clsx(
        "aspect-square size-auto rounded-full p-0 active:scale-100",
        [isDockBg ? "bg-backgroundAlt" : "bg-card"],
      )}
      onClick={onClick}
    >
      <Motion.DockLabel>{name}</Motion.DockLabel>
      <Motion.DockIcon>
        <AppIcon icon={icon} className="size-full" />
      </Motion.DockIcon>
    </Motion.DockItem>
  )
}

const Dock = () => {
  const dockApps = useAppStore((s) => s.dockApps)
  const isDockBg = useOptionsStore((s) => s.isDockBackground)

  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-center gap-3 p-4">
      <Motion.Dock
        className={clsx("items-end ", [
          isDockBg ? "bg-card pb-[10px]" : "bg-inherit",
        ])}
      >
        {dockApps.map((app) => (
          <DockItem
            key={`dock-app-${app.id}`}
            name={app.name}
            icon={app.icon}
            isDockBg={isDockBg}
            onClick={() => {
              window.location.href = ensureHttpPrefix(app.url)
            }}
          />
        ))}
      </Motion.Dock>
    </div>
  )
}

export default Dock
