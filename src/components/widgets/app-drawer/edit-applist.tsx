import clsx from "clsx"
import { useOptionsStore } from "../../../store/options"
import type { Setter } from "../../../types/react"
import Button from "../../ui/button"

interface EditAppListProps {
  removeMode: boolean
  setRemoveMode: Setter<boolean>
}

const EditAppList = ({ removeMode, setRemoveMode }: EditAppListProps) => {
  const resetDrawerApp = useOptionsStore((s) => s.resetDrawerApp)
  return (
    <div className="inline-flex gap-2">
      <Button
        icon="tabler:plus"
        size="icon"
        className="rounded-xl"
        iconSize={20}
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
  )
}

export default EditAppList
