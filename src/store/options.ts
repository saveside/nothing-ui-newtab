import { create } from "zustand"
import { combine, persist } from "zustand/middleware"

export const useOptionsStore = create(
  persist(
    combine(
      {
        // Clock
        enableDigitalClock: false,
        format24: false,
        greetings: false,

        customText: "Clock here to edit",
        selectedEngine: "Brave",
      },
      (set) => ({
        // Clock
        toggleDidigtalClock: () =>
          set((state) => ({ enableDigitalClock: !state.enableDigitalClock })),
        toggleFormat24: () => set((state) => ({ format24: !state.format24 })),
        toggelGreetings: () =>
          set((state) => ({ greetings: !state.greetings })),

        setCustomText: (text: string) => set({ customText: text }),
        setSelectedEngine: (engine: string) => set({ selectedEngine: engine }),
      }),
    ),
    {
      name: "nothing-newtab-options",
    },
  ),
)
