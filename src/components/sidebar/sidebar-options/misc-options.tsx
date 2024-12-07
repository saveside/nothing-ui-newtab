import { Icon } from "@iconify/react"
import { useSidebarOptions } from "../sidebar-store"
import OptionsGroup from "./shared/options-group"

const MiscOptions = () => {
  const setTab = useSidebarOptions((s) => s.setTab)

  return (
    <OptionsGroup title="Misc">
      <span className="inline-flex items-start justify-between">
        <span className="flex flex-col">
          <span>Dock Apps</span>
          <span className="text-destructive-foreground/50 text-sm">
            Add, edit and delete apps
          </span>
        </span>
        <button type="button" onClick={() => setTab("apps")}>
          <Icon icon="mingcute:settings-6-line" fontSize={20} />
        </button>
      </span>
    </OptionsGroup>
  )
}

export default MiscOptions
