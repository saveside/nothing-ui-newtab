import { Icon } from "@iconify/react/dist/iconify.js"
import { AnimatePresence, motion } from "framer-motion"
import type React from "react"
import { useEffect, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import Button from "~/components/ui/button"
import Input from "~/components/ui/input"
import type { App } from "~/lib/variables"
import type { Setter } from "~/types/react"
import { areObjectsEqual } from "~/utils"

interface ContainerProps {
  icon: string
  children: React.ReactNode
  delFunc: () => void
}

const Container = ({ icon, children, delFunc }: ContainerProps) => {
  return (
    <div className="relative flex flex-col items-center rounded-xl bg-background p-4 pb-2">
      <span className="flex size-11 items-center justify-center gap-1 rounded-full bg-card text-foreground transition-colors duration-300">
        {icon.startsWith("webicon:") ? (
          <img
            src={`https://www.google.com/s2/favicons?domain=${icon.split(":")[1]}&sz=128`}
            alt="app-icon"
          />
        ) : (
          <Icon icon={icon || "mynaui:daze-ghost"} fontSize={24} />
        )}
      </span>
      <div className="flex w-full flex-col space-y-2 pt-6">{children}</div>
      <Button
        variant="secondary"
        icon="mdi:trash-outline"
        size="icon"
        className="absolute top-3 right-3 size-8"
        onClick={delFunc}
      />
    </div>
  )
}

interface AppCardProps {
  cardLabel?: string // what kind, like dockApp, aiTool, search engine...
  app: App
  setApp?: Setter<App | null>
  appNames?: string[]
  update?: (id: string, app: App) => void
  remove?: (name: string) => void
}

export default function AppCard({
  cardLabel,
  app,
  setApp,
  appNames,
  update,
  remove,
}: AppCardProps) {
  const [dockApp, setDockApp] = useState<App>(app)
  const [debouncedIcon] = useDebounceValue(app.icon, 500)
  const [debouncedValue] = useDebounceValue(dockApp, 500)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setApp?.(dockApp)
  }, [dockApp, setApp])

  const submitHandler = () => {
    if (Object.values(debouncedValue).some((value) => value === "")) {
      return
    }

    if (
      update &&
      !appNames?.includes(debouncedValue.name) &&
      !areObjectsEqual<App>(debouncedValue, app, ["id"])
    ) {
      update(app.id, debouncedValue)
      setIsFocused(false)
    }
  }

  return (
    <Container icon={debouncedIcon} delFunc={() => remove?.(app.name)}>
      <Input
        variant="secondary"
        id={`${cardLabel?.split(" ").join("-") || "App"}-icon-${app.id}`}
        placeholder="icon"
        value={dockApp.icon}
        onInput={({ currentTarget: { value } }) =>
          setDockApp((prev) => ({ ...prev, icon: value }))
        }
        onFocus={() => setIsFocused(true)}
        className="text-foreground"
      />
      <Input
        variant="secondary"
        id={`${cardLabel || "App"}-name-${app.id}`}
        placeholder="name"
        value={dockApp.name}
        isError={appNames?.includes(debouncedValue.name)}
        errorTxt={`${cardLabel || "App"} with same name already found`}
        onInput={({ currentTarget: { value } }) =>
          setDockApp((prev) => ({ ...prev, name: value }))
        }
        onFocus={() => setIsFocused(true)}
        className="text-foreground"
      />
      <Input
        variant="secondary"
        id={`${cardLabel || "App"}-url-${app.id}`}
        placeholder="url"
        value={dockApp.url}
        onInput={({ currentTarget: { value } }) =>
          setDockApp((prev) => ({ ...prev, url: value }))
        }
        onFocus={() => setIsFocused(true)}
        className="text-foreground"
      />
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={
          isFocused ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isFocused && (
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: 10, opacity: 0 }}
              className="grid grid-cols-2 gap-2 pt-2"
            >
              <Button onClick={() => setIsFocused(false)}>Cancel</Button>
              <Button variant="accent" onClick={submitHandler}>
                Save
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Container>
  )
}
