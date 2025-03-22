import { Icon } from "@iconify/react/dist/iconify.js"
import clsx from "clsx"
import AppIcon from "~/components/ui/app-icon"
import { useAppStore } from "~/store/app-store"
import type { App } from "../../../lib/variables"
import { ensureHttpPrefix } from "../../../utils"
import Button from "../../ui/button"
import AppMenu from "./app-menu"

interface AppButtonProps {
  app: App
  isRemoveMode: boolean
}

const AppItem = ({ app, isRemoveMode }: AppButtonProps) => {
  const { drawerApps, removeDrawerApp } = useAppStore()

  if (!app) return null

  return (
    <AppMenu app={app}>
      <a
        href={ensureHttpPrefix(app.url)}
        className={clsx(
          "relative flex cursor-pointer select-none flex-col items-center justify-center gap-1 text-[12px]",
          drawerApps.length <= 16 && "grid-rows-4",
        )}
        onClick={(e) => isRemoveMode && e.preventDefault()}
      >
        <Button variant="secondary" size="icon">
          <AppIcon icon={app.icon} iconSize={20} />
        </Button>
        <span className="whitespace-nowrap">
          {stringTruncate(app.name, 10)}
        </span>
        {isRemoveMode && (
          <Button
            variant="destructive"
            className="absolute top-0 right-0 size-5 p-0"
            onClick={() => removeDrawerApp(app.id)}
          >
            <Icon icon="lucide:x" fontSize={15} />
          </Button>
        )}
      </a>
    </AppMenu>
  )
}

export default AppItem

function stringTruncate(str: string, maxCharLen: number) {
  if (str.length > maxCharLen) {
    return `${str.substring(0, 10)}...`
  }
  return str
}
