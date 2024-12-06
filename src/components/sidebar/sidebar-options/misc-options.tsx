import { Icon } from "@iconify/react"
import type { Setter } from "../../../types/react"
import type { Tab } from "../sidebar-store"
import OptionsGroup from "./shared/options-group"

interface MiscOptions {
  setCurrentTab: Setter<Tab>
}

const MiscOptions = ({ setCurrentTab }: MiscOptions) => {
  return (
    <OptionsGroup title="Misc">
      <span className="inline-flex items-start justify-between">
        <span className="flex flex-col">
          <span>Dock Apps</span>
          <span className="text-destructive-foreground/50 text-sm">
            Add, edit and delete apps
          </span>
        </span>
        <button type="button" onClick={() => setCurrentTab("apps")}>
          <Icon icon="mingcute:settings-6-line" fontSize={20} />
        </button>
      </span>
    </OptionsGroup>
  )
}

export default MiscOptions
