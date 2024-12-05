import { useOptionsStore } from "../../store/options"
import Clock from "./clock"
import { CustomText } from "./custom-text"
import Gallery from "./gallery"
import SearchBar from "./search-bar"
import Weather from "./weather"

const WidgetContainer = () => {
  const { enableDigitalClock } = useOptionsStore()

  return (
    <div className="grid w-full max-w-2xl gap-4 lg:max-w-5xl lg:grid-cols-4">
      <div className="col-span-2 flex justify-center lg:col-span-1">
        <div className="flex w-[592px] gap-5 lg:w-full lg:flex-col lg:justify-between">
          <Clock clockType={enableDigitalClock ? "digital" : "analogue"} />
          <span className="mt-auto">
            <CustomText />
          </span>
        </div>
      </div>
      <div className="col-span-2 flex flex-col items-center gap-4 lg:col-span-3 lg:items-end">
        <div className="inline-flex gap-4">
          <Gallery />
          <Weather />
        </div>
        <SearchBar />
      </div>
    </div>
  )
}

export default WidgetContainer
