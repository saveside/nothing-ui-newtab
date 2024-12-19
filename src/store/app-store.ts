import * as idb from "idb-keyval"
import { create } from "zustand"
import { combine, createJSONStorage, persist } from "zustand/middleware"
import {
  type App,
  dockApps as initialDockApps,
  drawerApps as initialDrawerApps,
} from "../lib/variables"

export const useAppStore = create(
  persist(
    combine(
      {
        drawerApps: sortApps(initialDrawerApps),
        dockApps: sortApps(initialDockApps),
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
        removeDockApp: (id: number) => {
          set((prev) => ({
            dockApps: prev.dockApps.filter((_, index) => index !== id),
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
  const updatedList = list
  updatedList[id] = updatedApp
  return updatedList
}

function appListIsMatching(list1: App[], list2: App[]) {
  return JSON.stringify(list1) === JSON.stringify(list2)
}
