import { motion } from "framer-motion"
import Button from "~/components/ui/button"
import { useOptionsStore } from "~/store/options"
import { useSidebarOptions } from "../sidebar-store"
import AppOptions from "./app-options"
import ClockOptions from "./clock-options"
import DockOptions from "./dock-options"
import GalleryOptions from "./gallery-options"
import GalleryTab from "./gallery-options/gallery-tab"
import GeneralOptions from "./general-options"
import MiscOptions from "./misc-options"
import AIToolsTab from "./tabs/ai-tools"
import SearchEnginesTab from "./tabs/search-engines"
import WeatherOptions from "./weather-options"

const MotionDiv = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ x: 200 }}
      animate={{ x: 0 }}
      exit={{ x: 200, opacity: 0 }}
      transition={{ ease: "linear", duration: 0.2 }}
      className="relative h-full w-full space-y-10"
    >
      {children}
    </motion.div>
  )
}

const SidebarOptions = () => {
  const tab = useSidebarOptions((s) => s.tab)
  const restoreDefaults = useOptionsStore((s) => s.restoreDefaults)

  return (
    <div className="w-full">
      {tab === "default" && (
        <MotionDiv>
          <GeneralOptions />
          <ClockOptions />
          <AppOptions />
          <MiscOptions />
          <GalleryOptions />
          <WeatherOptions />
          <Button
            variant="accent"
            className="ml-auto"
            onClick={restoreDefaults}
          >
            Restore Defaults
          </Button>
        </MotionDiv>
      )}
      {tab === "search-engines" && (
        <MotionDiv>
          <SearchEnginesTab />
        </MotionDiv>
      )}
      {tab === "apps" && (
        <MotionDiv>
          <DockOptions />
        </MotionDiv>
      )}
      {tab === "ai-tools" && (
        <MotionDiv>
          <AIToolsTab />
        </MotionDiv>
      )}
      {tab === "gallery" && (
        <MotionDiv>
          <GalleryTab />
        </MotionDiv>
      )}
    </div>
  )
}

export default SidebarOptions
