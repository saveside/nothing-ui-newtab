import { useEffect, useState } from "react"
import type { App } from "../../../lib/variables"
import { useOptionsStore } from "../../../store/options"
import type { Setter } from "../../../types/react"
import Input from "../../ui/input"
import Modal from "../../ui/modal"

interface AppFormProps {
  isOpen: boolean
  setIsOpen: Setter<boolean>
  app?: App | null
}

const AppForm = ({ isOpen, setIsOpen, app }: AppFormProps) => {
  // Store functions
  const { drawerApps, addDrawerApp, updateDrawerApp } = useOptionsStore()

  // Form functions
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")

  const submitHandler = () => {
    if (!name || !url) return

    if (!app) {
      addDrawerApp({ name, url, icon: "mdi:web" })
    } else {
      updateDrawerApp(
        drawerApps.indexOf(drawerApps.find((_app) => app.name === _app.name)!),
        { name, url, icon: app.icon },
      )
    }
    setIsOpen(false)
  }

  useEffect(() => {
    if (app) {
      setName(app.name)
      setUrl(app.url)
    }

    return () => {
      setName("")
      setUrl("")
    }
  }, [app])

  return (
    <Modal
      title="Add new app/website to app drawer"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      btnFunc={submitHandler}
      btnDisabled={!name || !url || (app?.name === name && app?.url === url)}
    >
      <div className="mt-4 space-y-3">
        <Input
          id="add-app-name"
          value={name}
          onInput={(e) => setName(e.currentTarget.value)}
          placeholder="e.g. Wallhaven"
          className="h-11"
        />
        <Input
          id="add-app-url"
          value={url}
          onInput={(e) => setUrl(e.currentTarget.value)}
          placeholder="e.g. https://wallhaven.cc/"
          className="h-11"
        />
      </div>
    </Modal>
  )
}

export default AppForm
