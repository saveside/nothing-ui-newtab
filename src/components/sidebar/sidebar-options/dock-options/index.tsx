import Button from "~/components/ui/button"
import { useAppStore } from "~/store/app-store"
import NewTabHeader from "../shared/newtab-header"
import DockAppCard from "./dock-app-card"

const DockOptions = () => {
  const { addDockApp, dockApps, resetDockApp } = useAppStore()

  return (
    <div className="space-y-6">
      <NewTabHeader
        rightButtons={
          <>
            <Button
              variant="secondary"
              size="icon"
              iconSize={20}
              icon="material-symbols:device-reset-rounded"
              onClick={resetDockApp}
            />
            <Button
              variant="secondary"
              size="icon"
              iconSize={20}
              icon="ic:round-plus"
              onClick={() => addDockApp()}
            />
          </>
        }
      />
      <div className="h-full space-y-5">
        {dockApps.map((app, index) => (
          <DockAppCard key={`app-${app.name}`} dockApp={app} index={index} />
        ))}
      </div>
    </div>
  )
}

export default DockOptions
