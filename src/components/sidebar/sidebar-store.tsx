import { create } from "zustand"

export type Tab = "default" | "apps"

interface SiebarOptions {
  tab: Tab
  setTab: (tab: Tab) => void
}

export const useSidebarOptions = create<SiebarOptions>()((set) => ({
  tab: "default",
  setTab: (tab: Tab) => set({ tab }),
}))
