import { useEffect } from "react"
import Sidebar from "./components/sidebar"
import AiTools from "./components/widgets/ai-tools"
import AppDrawer from "./components/widgets/app-drawer"
import Dock from "./components/widgets/dock"
import WidgetContainer from "./components/widgets/widget-container"
import { useImageStore } from "./store/image-store"
import { useOptionsStore } from "./store/options"

function App() {
  const { isDockEnabled, isAIToolsEnabled, isAppDrawerEnabled } =
    useOptionsStore()

  const fetchImages = useImageStore((s) => s.fetchImages)

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center p-4">
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
