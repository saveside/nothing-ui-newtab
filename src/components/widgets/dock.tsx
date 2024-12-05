import { Icon } from "@iconify/react"
import { dockApps } from "../../lib/variables"

const Dock = () => {
  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-center gap-3 p-4">
      {dockApps.map(({ url, icon }) => (
        <button
          key={url}
          type="button"
          onClick={() => window.open(`https://${url}`, "_blank")}
          className="hover:-translate-y-2 size-12 rounded-full bg-card text-card-foreground transition-all hover:bg-card-foreground/20"
        >
          <Icon icon={icon} fontSize={26} className="mx-auto" />
        </button>
      ))}
    </div>
  )
}

export default Dock
