import { Icon } from "@iconify/react"
import { useOptionsStore } from "../../../store/options"
import Button from "../../ui/button"
import NewTabHeader from "./shared/newtab-header"

const AppsOptions = () => {
  const { addDockApp, updateDockApp, dockApps, resetDockApp, removeDockApp } =
    useOptionsStore()

  return (
    <div className="space-y-6">
      <NewTabHeader
        rightButtons={
          <>
            <button type="button" onClick={resetDockApp}>
              <Icon
                icon="material-symbols:device-reset-rounded"
                fontSize={22}
              />
            </button>
            <button type="button">
              <Icon
                icon="ic:round-plus"
                fontSize={24}
                onClick={() => addDockApp()}
              />
            </button>
          </>
        }
      />
      <div className=" h-full space-y-5">
        {dockApps.map((app, index) => (
          <div
            key={`app-by-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
            className="inline-flex gap-2"
          >
            <Button
              variant="secondary"
              icon={app.icon}
              size="icon"
              iconSize={24}
              className="hover:bg-background active:scale-100"
            />
            <div className="w-[68.2%]">
              <input
                id={`app-name-${index}`}
                value={app.name}
                onInput={(e) =>
                  updateDockApp(index, {
                    ...app,
                    name: e.currentTarget.value,
                  })
                }
                className="bg-inherit text-inherit focus:outline-none"
              />
              <input
                id={`app-url-${index}`}
                value={app.url}
                onInput={(e) => {
                  updateDockApp(index, {
                    ...app,
                    url: e.currentTarget.value,
                  })
                }}
                className="bg-inherit text-inherit focus:outline-none"
              />
            </div>
            <div className="inline-flex items-center">
              <Button
                icon="mdi:trash-outline"
                variant="destructive"
                size="icon"
                className="size-8"
                onClick={() => removeDockApp(index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AppsOptions
