import { Icon } from "@iconify/react"
import { useOptionsStore } from "../../../store/options"
import { useSidebarOptions } from "../sidebar-store"
import OptionsGroup from "./shared/options-group"
import ToggleOption from "./shared/toggle-option"

const MiscOptions = () => {
  const setTab = useSidebarOptions((s) => s.setTab)
  const {
    isAIToolsEnabled,
    toggleEnableAITools,
    isAppDrawerEnabled,
    toggleEnableAppDrawer,
    isDockEnabled,
    toggleDock,
    isMonochromeIcon,
    toggleMonochromeIcon,
  } = useOptionsStore()

  return (
    <OptionsGroup title="Misc">
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
        label="Enable AI tools"
        enabled={isAIToolsEnabled}
        onChange={toggleEnableAITools}
      />
      <ToggleOption
        label="Enable app drawer"
        enabled={isAppDrawerEnabled}
        onChange={toggleEnableAppDrawer}
      />
      <ToggleOption
        label="Enable monochrom icon"
        desc="Grayscale icon for newly added apps"
        enabled={isMonochromeIcon}
        onChange={toggleMonochromeIcon}
      />
    </OptionsGroup>
  )
}

export default MiscOptions
