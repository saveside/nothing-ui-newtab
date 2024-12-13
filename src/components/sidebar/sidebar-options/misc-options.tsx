import { useOptionsStore } from "../../../store/options"
import OptionsGroup from "./shared/options-group"
import ToggleOption from "./shared/toggle-option"

const MiscOptions = () => {
  const {
    isAIToolsEnabled,
    toggleEnableAITools,
    isMonochromeIcon,
    toggleMonochromeIcon,
  } = useOptionsStore()

  return (
    <OptionsGroup title="Misc">
      <ToggleOption
        label="Enable AI tools"
        enabled={isAIToolsEnabled}
        onChange={toggleEnableAITools}
      />
      <ToggleOption
        label="Enable monochrome icon"
        desc="For newly added apps"
        enabled={isMonochromeIcon}
        onChange={toggleMonochromeIcon}
      />
    </OptionsGroup>
  )
}

export default MiscOptions
