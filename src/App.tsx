import { Suspense, lazy, useEffect } from "react"
import BackgroundImage from "./components/background-image"
import Sidebar from "./components/sidebar"
import WidgetContainer from "./components/widgets/widget-container"
import { useImageStore } from "./store/image-store"
import { useOptionsStore } from "./store/options"
import { useThemeStore } from "./store/theme"

const Dock = lazy(() => import("./components/widgets/dock"))
const AiTools = lazy(() => import("./components/widgets/ai-tools"))
const AppDrawer = lazy(() => import("./components/widgets/app-drawer"))

function App() {
  const { isDockEnabled, isAIToolsEnabled, isAppDrawerEnabled } =
    useOptionsStore()
  const isLightMode = useThemeStore((s) => s.isLightMode)
  const fetchImages = useImageStore((s) => s.fetchImages)

  useEffect(() => {
    const html = document.documentElement
    const mode = html.getAttribute("data-theme")
    if (mode !== "light" && isLightMode) {
      html.setAttribute("data-theme", "light")
    } else {
      html.setAttribute("data-theme", "dark")
    }
  }, [isLightMode])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  return (
    <>
      <BackgroundImage />
      <div className="flex min-h-screen w-full select-none items-center justify-center p-4">
        <WidgetContainer />
        <Sidebar />
        <Suspense>
          {isDockEnabled && <Dock />}
          {isAIToolsEnabled && <AiTools />}
          {isAppDrawerEnabled && <AppDrawer />}
        </Suspense>
      </div>
    </>
  )
}

export default App
