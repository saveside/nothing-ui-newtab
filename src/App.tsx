import Sidebar from "./components/sidebar"
import AiTools from "./components/widgets/ai-tools"
import AppDrawer from "./components/widgets/app-drawer"
import Dock from "./components/widgets/dock"
import WidgetContainer from "./components/widgets/widget-container"
import { useOptionsStore } from "./store/options"

function App() {
  const { isAIToolsEnabled, isAppDrawerEnabled } = useOptionsStore()
  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center p-4">
        <WidgetContainer />
      </div>
      <Sidebar />
      <Dock />
      {isAIToolsEnabled && <AiTools />}
      {isAppDrawerEnabled && <AppDrawer />}
    </>
  )
}

export default App
