import { useOptionsStore } from "~/store/options"
import OptionsGroup from "../shared/options-group"
import TabSwitchButton from "../shared/tab-switch-button"
import ToggleOption from "../shared/toggle-option"

const GalleryOptions = () => {
  const { isMonochromeWidgetImg, toggleMonochromeWidgetImg } = useOptionsStore()
  return (
    <OptionsGroup title="Gallery">
      <ToggleOption
        label="Enable monochrome images"
        desc="For gallery widget"
        enabled={isMonochromeWidgetImg}
        onChange={toggleMonochromeWidgetImg}
      />
      <TabSwitchButton
        title="Image Gallery"
        desc="Upload images for widget"
        icon="solar:gallery-bold"
        tabToSwitch="gallery"
      />
    </OptionsGroup>
  )
}

export default GalleryOptions
