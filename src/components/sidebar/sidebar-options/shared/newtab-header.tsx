import { Icon } from "@iconify/react"
import { useSidebarOptions } from "../../sidebar-store"

interface NewTabHeader {
  rightButtons?: React.ReactNode
}

const NewTabHeader = ({ rightButtons }: NewTabHeader) => {
  const setTab = useSidebarOptions((s) => s.setTab)
  return (
    <div className="inline-flex w-full items-center justify-between">
      <button type="button" onClick={() => setTab("default")}>
        <Icon icon="mingcute:left-line" fontSize={24} />
      </button>
      <div className="space-x-2">{rightButtons}</div>
    </div>
  )
}

export default NewTabHeader
