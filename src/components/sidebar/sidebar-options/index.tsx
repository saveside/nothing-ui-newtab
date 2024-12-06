import { motion } from "framer-motion"
import { useSidebarOptions } from "../sidebar-store"
import AppsOptions from "./apps-options"
import ClockOptions from "./clock-options"
import MiscOptions from "./misc-options"

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
  const { tab, setTab } = useSidebarOptions()

  return (
    <div className="w-full">
      {tab === "default" && (
        <MotionDiv>
          <ClockOptions />
          <MiscOptions setCurrentTab={setTab} />
        </MotionDiv>
      )}
      {tab === "apps" && (
        <MotionDiv>
          <AppsOptions />
        </MotionDiv>
      )}
    </div>
  )
}

export default SidebarOptions
