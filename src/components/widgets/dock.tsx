import { useOptionsStore } from "../../store/options"
import Button from "../ui/button"

const Dock = () => {
  const dockApps = useOptionsStore((s) => s.dockApps)
  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-center gap-3 p-4">
      {dockApps.map(({ url, icon }, index) => (
        <Button
          key={`dock-app-${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            index
          }`}
          onClick={() => window.open(`https://${url}`, "_blank")}
          icon={icon}
          size="icon"
          className="size-12"
          iconSize={26}
        />
      ))}
    </div>
  )
}

export default Dock
