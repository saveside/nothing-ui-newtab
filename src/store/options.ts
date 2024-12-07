import { create } from "zustand"
import { combine, persist } from "zustand/middleware"
import { type DockApp, dockApps as initialDockApps } from "../lib/variables"

const placeHolder = // Temp
  "https://images.pexels.com/photos/3419791/pexels-photo-3419791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

export const useOptionsStore = create(
  persist(
    combine(
      {
        // Clock
        enableDigitalClock: false,
        format24: false,
        greetings: false,

        customText: "Click here to edit",
        selectedEngine: "Brave",

        // Misc
        image: placeHolder,
        weatherAPI: "",
        weatherLocation: "",
        isScaleFahrenheit: false,

        // DockApp
        dockApps: initialDockApps as DockApp[],
      },
      (set, get) => ({
        // Clock Setters
        toggleDidigtalClock: () =>
          set((state) => ({ enableDigitalClock: !state.enableDigitalClock })),
        toggleFormat24: () => set((state) => ({ format24: !state.format24 })),
        toggelGreetings: () =>
          set((state) => ({ greetings: !state.greetings })),

        // Misc Setters
        setImage: (url: string) => set({ image: url }),
        setWeatherAPI: (key: string) => set({ weatherAPI: key }),
        setWeatherLocation: (location: string) =>
          set({ weatherLocation: location }),
        toggleFahrenheitScale: () =>
          set((state) => ({
            isScaleFahrenheit: !state.isScaleFahrenheit,
          })),

        // DockApp Setters
        addDockApp: () => {
          set((prev) => ({
            dockApps: [
              ...prev.dockApps,
              {
                name: "NothingUiNewTab",
                url: "github.com/ImRayy/nothing-ui-new-tab",
                icon: "mdi:github",
              } satisfies DockApp,
            ],
          }))
        },
        removeDockApp: (id: number) => {
          set((prev) => ({
            dockApps: prev.dockApps.filter((_, index) => index !== id),
          }))
        },
        updateDockApp: (id: number, app: DockApp) => {
          set((state) => {
            const updatedData = [...state.dockApps]
            updatedData[id] = app
            return { dockApps: updatedData }
          })
        },
        resetDockApp: () => {
          // This check ain't necessary, but overall a better perf approach
          const prevObjects = JSON.stringify(get().dockApps)
          const current = JSON.stringify(initialDockApps)
          if (prevObjects !== current) {
            set({ dockApps: initialDockApps })
          }
        },

        setCustomText: (text: string) => set({ customText: text }),
        setSelectedEngine: (engine: string) => set({ selectedEngine: engine }),
      }),
    ),
    {
      name: "nothing-newtab-options",
    },
  ),
)
