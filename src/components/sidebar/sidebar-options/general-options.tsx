import { useThemeStore } from "~/store/theme"
import OptionsGroup from "./shared/options-group"
import ToggleOption from "./shared/toggle-option"

const GeneralOptions = () => {
  const { isLightMode, toggleLightMode } = useThemeStore()
  return (
    <OptionsGroup title="General">
      <ToggleOption
        label="Enable light mode"
        enabled={isLightMode}
        onChange={toggleLightMode}
      />
    </OptionsGroup>
  )
}

export default GeneralOptions
