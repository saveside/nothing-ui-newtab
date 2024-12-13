import { useEffect } from "react"
import Sidebar from "./components/sidebar"
import AiTools from "./components/widgets/ai-tools"
import AppDrawer from "./components/widgets/app-drawer"
import Dock from "./components/widgets/dock"
import WidgetContainer from "./components/widgets/widget-container"
import { useImageStore } from "./store/image-store"
import { useOptionsStore } from "./store/options"
import { useThemeStore } from "./store/theme"

function App() {
  const { isDockEnabled, isAIToolsEnabled, isAppDrawerEnabled } =
    useOptionsStore()
  const isLightMode = useThemeStore((s) => s.isLightMode)
  const fetchImages = useImageStore((s) => s.fetchImages)

  useEffect(() => {
    const html = document.documentElement
    if (isLightMode) {
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
      <div className="relative flex min-h-screen w-full items-center justify-center p-4 ">
        <WidgetContainer />
        <Sidebar />
        {isDockEnabled && <Dock />}
        {isAIToolsEnabled && <AiTools />}
        {isAppDrawerEnabled && <AppDrawer />}
      </div>
    </>
  )
}

export default App
