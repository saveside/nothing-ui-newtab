import { create } from "zustand"
import { combine, persist } from "zustand/middleware"
import {
  type App,
  dockApps as initialDockApps,
  drawerApps as initialDrawerApps,
} from "../lib/variables"

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
        isAIToolsEnabled: true,
        isAppDrawerEnabled: true,

        // AppDrawer
        drawerApps: sortApps(initialDrawerApps),

        // DockApp
        isDockEnabled: true,
        dockApps: sortApps(initialDockApps),
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
        toggleEnableAITools: () =>
          set((prev) => ({ isAIToolsEnabled: !prev.isAIToolsEnabled })),

        // App Drwaer setters
        toggleEnableAppDrawer: () =>
          set((prev) => ({
            isAppDrawerEnabled: !prev.isAppDrawerEnabled,
          })),
        addDrawerApp: (app: App) => {
          set((prev) => ({ drawerApps: addApp(prev.drawerApps, app) }))
        },
        addToDock: (app: App) => {
          set((prev) => ({ dockApps: addApp(prev.dockApps, app) }))
        },
        removeDrawerApp: (name: string) => {
          set((prev) => ({
            drawerApps: removeApp(prev.drawerApps, name),
          }))
        },
        updateDrawerApp: (id: number, app: App) => {
          set((prev) => ({ drawerApps: updateApp(prev.drawerApps, id, app) }))
        },
        resetDrawerApp: () => {
          // This check ain't necessary, but overall a better perf approach
          if (!appListIsMatching(get().drawerApps, initialDrawerApps)) {
            set({ drawerApps: initialDrawerApps })
          }
        },

        // DockApp Setters
        toggleDock: () =>
          set((prev) => ({ isDockEnabled: !prev.isDockEnabled })),
        addDockApp: () => {
          set((prev) => ({
            dockApps: [
              ...prev.dockApps,
              {
                name: "NothingUiNewTab",
                url: "github.com/ImRayy/nothing-ui-new-tab",
                icon: "mdi:github",
              } satisfies App,
            ],
          }))
        },
        removeDockApp: (name: string) => {
          set((prev) => ({
            dockApps: removeApp(prev.dockApps, name),
          }))
        },
        updateDockApp: (id: number, app: App) => {
          set((prev) => ({ dockApps: updateApp(prev.dockApps, id, app) }))
        },
        resetDockApp: () => {
          if (!appListIsMatching(get().dockApps, initialDockApps)) {
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

// App list actions
function sortApps(list: App[]) {
  return list.sort((a, b) => a.name.localeCompare(b.name))
}

function addApp(list: App[], newApp: App): App[] {
  if (!list.find(({ name }) => name === newApp.name)) {
    list.push(newApp)
    return list
  }
  alert("You can't add another app with same name")
  return list
}

function removeApp(list: App[], name: string) {
  return list.filter((app) => app.name !== name)
}

function updateApp(list: App[], id: number, updatedApp: App) {
  const updatedList = list
  updatedList[id] = updatedApp
  return updatedList
}

function appListIsMatching(list1: App[], list2: App[]) {
  return JSON.stringify(list1) === JSON.stringify(list2)
}
