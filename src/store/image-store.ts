import { get as idbGet, set as idbSet } from "idb-keyval"
import { create } from "zustand"
import type { ImageFile } from "~/types"

type ImageStore = {
  shouldSave: boolean
  loading: boolean
  images: ImageFile[]
  setImages: (images: ImageFile[]) => void
  addImages: (images: ImageFile[]) => void
  fetchImages: () => void
  removeImage: (name: string) => void
  saveImagesToDB: () => void
}
export const useImageStore = create<ImageStore>((set, get) => ({
  shouldSave: false,
  loading: true,
  images: [],
  setImages: (images) => set({ images }),
  addImages: (images) =>
    set((prev) => ({
      shouldSave: true,
      images: prev.images.concat(
        // Filter out duplicate images
        images.filter(
          (img) => !prev.images.find(({ name }) => name === img.name),
        ),
      ),
    })),
  fetchImages: async () => {
    const prevImages = get().images
    if (!prevImages || prevImages.length === 0) {
      const images = await idbGet("gallery-images")
      if (images) {
        const newImgList: ImageFile[] = images.map((img: ImageFile) => ({
          ...img,
          imageUrl: URL.createObjectURL(img.file),
        }))
        set({
          images: newImgList,
        })
      }
    }
    set({ loading: false })
  },
  removeImage: (name) =>
    set((prev) => ({
      shouldSave: true,
      images: prev.images.filter((img) => img.name !== name),
    })),
  saveImagesToDB: async () => {
    try {
      await idbSet("gallery-images", get().images)
      set({ shouldSave: false })

      // biome-ignore lint/suspicious/noConsoleLog: <explanation>
      console.log("Images saved to IndexedDB successfully")
    } catch (error) {
      console.error("Error saving images to IndexedDB:", error)
    }
  },
}))
