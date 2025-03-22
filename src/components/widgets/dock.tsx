import clsx from "clsx"
import { useAppStore } from "~/store/app-store"
import { useOptionsStore } from "~/store/options"
import { ensureHttpPrefix } from "~/utils"
import * as Motion from "../motion-primitives/dock"
import AppIcon from "../ui/app-icon"

const Dock = () => {
  const dockApps = useAppStore((s) => s.dockApps)
  const isDockBg = useOptionsStore((s) => s.isDockBackground)

  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-center gap-3 p-4">
      <Motion.Dock
        className={clsx("items-end ", [
          isDockBg ? "bg-card pb-[10px]" : "bg-inherit pb-0.5",
        ])}
      >
        {dockApps.map((app) => (
          <a href={ensureHttpPrefix(app.url)} key={app.id}>
            <Motion.DockItem
              className={clsx("aspect-square rounded-full", [
                isDockBg ? " bg-backgroundAlt" : "bg-card",
              ])}
            >
              <Motion.DockLabel>{app.name}</Motion.DockLabel>
              <Motion.DockIcon>
                <AppIcon icon={app.icon} className="size-full" />
              </Motion.DockIcon>
            </Motion.DockItem>
          </a>
        ))}
      </Motion.Dock>
    </div>
  )
}

export default Dock
