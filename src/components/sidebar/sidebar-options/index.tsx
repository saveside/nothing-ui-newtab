import { motion } from "framer-motion"
import { useSidebarOptions } from "../sidebar-store"
import AppOptions from "./app-options"
import ClockOptions from "./clock-options"
import DockOptions from "./dock-options"
import MiscOptions from "./misc-options"
import WeatherOptions from "./weather-options"

const MotionDiv = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ x: 200 }}
      animate={{ x: 0 }}
      exit={{ x: 200, opacity: 0 }}
      transition={{ ease: "linear", duration: 0.2 }}
      className="relative w-full space-y-10"
    >
      {children}
    </motion.div>
  )
}

const SidebarOptions = () => {
  const tab = useSidebarOptions((s) => s.tab)

  return (
    <div className="w-full">
      {tab === "default" && (
        <MotionDiv>
          <ClockOptions />
          <AppOptions />
          <MiscOptions />
          <WeatherOptions />
        </MotionDiv>
      )}
      {tab === "apps" && (
        <MotionDiv>
          <DockOptions />
        </MotionDiv>
      )}
    </div>
  )
}

export default SidebarOptions
