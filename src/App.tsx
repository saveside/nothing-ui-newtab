import { useEffect } from "react"
import Sidebar from "./components/sidebar"
import AiTools from "./components/widgets/ai-tools"
import AppDrawer from "./components/widgets/app-drawer"
import Dock from "./components/widgets/dock"
import WidgetContainer from "./components/widgets/widget-container"
import { useImageStore } from "./store/image-store"
import { useOptionsStore } from "./store/options"

function App() {
  const { isDockEnabled, isAIToolsEnabled, isAppDrawerEnabled, isLightMode } =
    useOptionsStore()

  const fetchImages = useImageStore((s) => s.fetchImages)

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute("data-theme", "dark")

    if (isLightMode) {
      html.setAttribute("data-theme", "light")
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
