import { motion } from "framer-motion"
import { lazy } from "react"
import Button from "~/components/ui/button"
import { useOptionsStore } from "~/store/options"
import { useSidebarOptions } from "../sidebar-store"
import AppOptions from "./app-options"
import ClockOptions from "./clock-options"
import GalleryOptions from "./gallery-options"
import GeneralOptions from "./general-options"
import MiscOptions from "./misc-options"
import WeatherOptions from "./weather-options"

const AIToolsTab = lazy(() => import("./tabs/ai-tools"))
const DockOptions = lazy(() => import("./dock-options"))
const GalleryTab = lazy(() => import("./gallery-options/gallery-tab"))
const SearchEnginesTab = lazy(() => import("./tabs/search-engines"))

const MotionDiv = ({
  children,
  direction = "right",
}: { children: React.ReactNode; direction?: "right" | "left" }) => {
  return (
    <motion.div
      initial={direction === "right" ? { x: 200 } : { x: -200 }}
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
        <MotionDiv direction="left">
          <SearchEnginesTab />
        </MotionDiv>
      )}
      {tab === "apps" && (
        <MotionDiv direction="left">
          <DockOptions />
        </MotionDiv>
      )}
      {tab === "ai-tools" && (
        <MotionDiv direction="left">
          <AIToolsTab />
        </MotionDiv>
      )}
      {tab === "gallery" && (
        <MotionDiv direction="left">
          <GalleryTab />
        </MotionDiv>
      )}
    </div>
  )
}

export default SidebarOptions
