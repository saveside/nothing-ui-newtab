import * as idb from "idb-keyval"
import { create } from "zustand"
import { combine, createJSONStorage, persist } from "zustand/middleware"
import {
  type App,
  aiTools as initialAITools,
  dockApps as initialDockApps,
  drawerApps as initialDrawerApps,
} from "../lib/variables"

export const useAppStore = create(
  persist(
    combine(
      {
        drawerApps: sortApps(initialDrawerApps),
        dockApps: sortApps(initialDockApps),
        aiTools: sortApps(initialAITools),
      },
      (set, get) => ({
        // Drawer Apps
        addDrawerApp: (app: App) => {
          set((prev) => ({ drawerApps: addApp(prev.drawerApps, app) }))
        },
        addToDock: (app: App) => {
          set((prev) => ({ dockApps: [...prev.dockApps, app] }))
        },
        updateDrawerApp: (id: number, app: App) => {
          set((prev) => ({ drawerApps: updateApp(prev.drawerApps, id, app) }))
        },
        removeDrawerApp: (name: string) => {
          set((prev) => ({
            drawerApps: removeApp(prev.drawerApps, name),
          }))
        },
        resetDrawerApp: () => {
          // This check ain't necessary, but overall a better perf approach
          if (!appListIsMatching(get().drawerApps, initialDrawerApps)) {
            set({ drawerApps: initialDrawerApps })
          }
        },

        // AI Tools
        addAITool: (app: App) => {
          set((prev) => ({ aiTools: addApp(prev.aiTools, app) }))
        },
        updateAITool: (id: number, app: App) => {
          set((prev) => ({ aiTools: updateApp(prev.aiTools, id, app) }))
        },
        removeAITool: (name: string) => {
          set((prev) => ({
            aiTools: removeApp(prev.aiTools, name),
          }))
        },
        resetAITools: () => {
          // This check ain't necessary, but overall a better perf approach
          if (!appListIsMatching(get().aiTools, initialAITools)) {
            set({ aiTools: initialAITools })
          }
        },

        // Dock Apps
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
      }),
    ),
    {
      // Persistent storage options
      storage: createJSONStorage(() => ({
        getItem: idb.get,
        setItem: idb.set,
        removeItem: idb.del,
      })),
      name: "app-store",
    },
  ),
)
// App list actions
function sortApps(list: App[]) {
  return list.sort((a, b) => a.name.localeCompare(b.name))
}

function addApp(list: App[], newApp: App): App[] {
  if (!list.find(({ name }) => name === newApp.name)) {
    return [...list, newApp]
  }
  alert("You can't add another app with same name")
  return list
}

function removeApp(list: App[], name: string) {
  return list.filter((app) => app.name !== name)
}

function updateApp(list: App[], id: number, updatedApp: App) {
  return list.map((app, index) => (index === id ? updatedApp : app))
}

function appListIsMatching(list1: App[], list2: App[]) {
  return JSON.stringify(list1) === JSON.stringify(list2)
}
