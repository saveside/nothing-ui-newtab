import Sidebar from "./components/sidebar"
import Dock from "./components/widgets/dock"
import WidgetContainer from "./components/widgets/widget-container"

function App() {
  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center p-4">
        <WidgetContainer />
      </div>
      <Sidebar />
      <Dock />
    </>
  )
}

export default App
