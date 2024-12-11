import clsx from "clsx"
import { SetStateAction, useState } from "react"
import { useOptionsStore } from "../../../store/options"
import type { Setter } from "../../../types/react"
import Button from "../../ui/button"
import Input from "../../ui/input"
import Modal from "../../ui/modal"

interface EditAppListProps {
  removeMode: boolean
  setRemoveMode: Setter<boolean>
}

const EditAppList = ({ removeMode, setRemoveMode }: EditAppListProps) => {
  // Store functions
  const { resetDrawerApp, addDrawerApp } = useOptionsStore()

  // Modal functions
  const [isOpen, setIsOpen] = useState(false)

  // Form functions
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")

  const submitHandler = () => {
    if (!name || !url) return
    addDrawerApp({ name, url, icon: "mdi:web" })
    setIsOpen(false)
  }

  return (
    <>
      <div className="inline-flex gap-2">
        <Button
          icon="tabler:plus"
          size="icon"
          className="rounded-xl"
          iconSize={20}
          onClick={() => setIsOpen(true)}
        />
        <Button
          variant={removeMode ? "destructive" : "primary"}
          icon="tabler:trash"
          size="icon"
          className={clsx("rounded-xl")}
          onClick={() => setRemoveMode((prev) => !prev)}
          iconSize={20}
        />
        <Button
          icon="material-symbols:device-reset-rounded"
          size="icon"
          className={clsx("rounded-xl")}
          onClick={resetDrawerApp}
          iconSize={20}
        />
      </div>
      <Modal
        title="Add new app/website to app drawer"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        btnFunc={submitHandler}
        btnDisabled={!name || !url}
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
    </>
  )
}

export default EditAppList
