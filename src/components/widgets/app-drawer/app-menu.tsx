import {
  Content,
  Item,
  Label,
  Portal,
  Root,
  Trigger,
} from "@radix-ui/react-context-menu"
import type React from "react"
import { useEffect } from "react"
import type { App } from "../../../lib/variables"
import { useOptionsStore } from "../../../store/options"
import Button from "../../ui/button"
import { appListStore } from "./selected-app.store"

interface AppMenuProps {
  children: React.ReactNode
  app: App
}

const AppMenu = ({ children, app }: AppMenuProps) => {
  const { removeDrawerApp, dockApps, addToDock } = useOptionsStore()
  const setSelectedApp = appListStore((s) => s.setSelectedApp)

  const isCurrentAppInDock = (): boolean => {
    return typeof dockApps.find(({ name }) => name === app.name) !== "undefined"
  }

  useEffect(() => {
    return () => setSelectedApp(null)
  }, [setSelectedApp])

  return (
    <Root>
      <Trigger className="ContextMenuTrigger">{children}</Trigger>
      <Portal>
        <Content className="z-10 w-44 select-none space-y-1 rounded-xl border border-card-foreground/20 bg-background p-1 text-black">
          <Label className="truncate px-4 pt-2 text-destructive text-sm">
            {app.name}
          </Label>
          <Item>
            <Button
              variant="secondary"
              icon="tabler:layout-grid-add"
              className="h-9 w-full justify-start"
              onClick={() => addToDock(app)}
              disabled={isCurrentAppInDock()}
            >
              Add to dock
            </Button>
          </Item>
          <Item>
            <Button
              variant="secondary"
              icon="tabler:mood-edit"
              className="h-9 w-full justify-start"
              onClick={() => setSelectedApp(app)}
            >
              Edit/Update
            </Button>
          </Item>
          <Item>
            <Button
              variant="secondary"
              icon="tabler:trash"
              className="h-9 w-full justify-start"
              onClick={() => removeDrawerApp(app.name)}
            >
              Remove
            </Button>
          </Item>
        </Content>
      </Portal>
    </Root>
  )
}

export default AppMenu
