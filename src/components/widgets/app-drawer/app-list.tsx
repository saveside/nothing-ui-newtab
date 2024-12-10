import { Icon } from "@iconify/react/dist/iconify.js"
import clsx from "clsx"
import { motion } from "framer-motion"
import { useOptionsStore } from "../../../store/options"
import Button from "../../ui/button"

function stringTruncate(str: string, maxCharLen: number) {
  if (str.length > maxCharLen) {
    return `${str.substring(0, 10)}...`
  }
  return str
}

interface AppListProps {
  isRemoveMode: boolean
}

const AppList = ({ isRemoveMode }: AppListProps) => {
  const { drawerApps, removeDrawerApp } = useOptionsStore()
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="h-[352px] w-80 overflow-y-auto rounded-xl border-4 border-card-foreground/10 bg-card p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 80 }}
        transition={{ ease: "linear", duration: 0.16 }}
        className="grid w-full grid-cols-4 gap-4"
      >
        {drawerApps.map((app, index) => (
          <span
            key={`drawer-${app}-${index.toString().padStart(2, "0")}`}
            className={clsx(
              "relative flex flex-col items-center justify-center gap-1 text-[12px]",
              drawerApps.length <= 16 && "grid-rows-4",
            )}
          >
            <span>
              <Button
                variant="secondary"
                icon={app.icon}
                size="icon"
                iconSize={24}
              />
            </span>
            <span className="whitespace-nowrap">
              {stringTruncate(app.name, 10)}
            </span>
            {isRemoveMode && (
              <Button
                variant="destructive"
                icon="lucide:x"
                iconSize={15}
                className="absolute top-0 right-0 size-5 p-0"
                onClick={() => removeDrawerApp(app.name)}
              />
            )}
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default AppList
