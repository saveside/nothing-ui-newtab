import { Icon } from "@iconify/react"
import { type Tab, useSidebarOptions } from "../../sidebar-store"

interface TabSwitchProps {
  title: string
  desc: string
  icon: string
  tabToSwitch: Tab
}

const TabSwitchButton = ({
  title,
  desc,
  icon,
  tabToSwitch,
}: TabSwitchProps) => {
  const setTab = useSidebarOptions((s) => s.setTab)

  return (
    <button
      type="button"
      className="inline-flex items-center justify-between p-0 transition-transform duration-150 active:scale-95"
      onClick={() => setTab(tabToSwitch)}
    >
      <span className="flex flex-col">
        <span className="w-full text-start">{title}</span>
        <span className="text-destructive-foreground/50 text-sm">{desc}</span>
      </span>
      <span>
        <Icon icon={icon} fontSize={20} />
      </span>
    </button>
  )
}

export default TabSwitchButton
