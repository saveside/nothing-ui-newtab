import { Icon } from "@iconify/react/dist/iconify.js"
import { useOptionsStore } from "../../../store/options"
import { useSidebarOptions } from "../sidebar-store"
import OptionsGroup from "./shared/options-group"
import ToggleOption from "./shared/toggle-option"

const AppOptions = () => {
  const {
    isAppDrawerEnabled,
    toggleEnableAppDrawer,
    isDockEnabled,
    toggleDock,
  } = useOptionsStore()

  const setTab = useSidebarOptions((s) => s.setTab)
  return (
    <OptionsGroup title="Apps">
      <ToggleOption
        label="Enable dock"
        enabled={isDockEnabled}
        onChange={toggleDock}
      />
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
      <ToggleOption
        label="Enable app drawer"
        enabled={isAppDrawerEnabled}
        onChange={toggleEnableAppDrawer}
      />
    </OptionsGroup>
  )
}

export default AppOptions
