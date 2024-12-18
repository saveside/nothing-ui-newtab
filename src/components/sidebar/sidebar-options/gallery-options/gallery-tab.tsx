import { Icon } from "@iconify/react"
import { del } from "idb-keyval"
import { useEffect, useRef } from "react"
import Button from "~/components/ui/button"
import Input from "~/components/ui/input"
import { useImageStore } from "~/store/image-store"
import { useOptionsStore } from "~/store/options"
import type { ImageFile } from "~/types"
import NewTabHeader from "../shared/newtab-header"

const GalleryTab = () => {
  const {
    images,
    addImages,
    removeImage,
    shouldSave,
    saveImagesToDB,
    setImages,
  } = useImageStore()

  const { isBgImage, bgImageIndex, setBgImageIndex } = useOptionsStore()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleOnSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const newImages: ImageFile[] = Array.from(files).map((file) => ({
        file,
        name: file.name,
        type: file.type,
        imageUrl: URL.createObjectURL(file),
      }))
      addImages(newImages)
    }
  }

  useEffect(() => {
    if (images.length === 0) {
      setBgImageIndex(null)
    }
  }, [images, setBgImageIndex])

  return (
    <div className="h-[86%] space-y-6">
      <NewTabHeader
        rightButtons={
          <>
            <Button
              variant="secondary"
              size="icon"
              icon="ri:image-add-fill"
              onClick={() => {
                inputRef.current?.click()
              }}
            />
            <Button
              variant="secondary"
              size="icon"
              icon="tabler:trash"
              onClick={async () => {
                await del("gallery-images").then(() => setImages([]))
              }}
            />
            <Button
              variant={shouldSave ? "accent" : "secondary"}
              size="icon"
              icon="mdi:content-save-all"
              onClick={saveImagesToDB}
            />
          </>
        }
      />

      {images?.length > 0 ? (
        <div className="flex flex-col gap-3">
          {images?.map((img, index) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <div
              key={img.name}
              className="group relative h-48 overflow-hidden rounded-xl border-4 border-transparent shadow-md"
              style={
                isBgImage && bgImageIndex === index
                  ? {
                      borderColor: "hsl(var(--destructive))",
                    }
                  : {}
              }
              onClick={() => isBgImage && setBgImageIndex(index)}
            >
              <img
                loading="lazy"
                className="size-full object-cover hover:scale-105"
                src={img.imageUrl}
                alt="gallary-image"
              />
              <Button
                variant="destructive"
                icon="lucide:x"
                size="icon"
                className="absolute top-2 right-3 hidden size-8 group-hover:flex"
                onClick={() => removeImage(img.name)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center text-card-foreground/40">
          <Icon icon="uil:image-block" fontSize={80} />
          <span>No image found!</span>
        </div>
      )}
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleOnSelect}
        className="hidden"
        multiple
      />
    </div>
  )
}

export default GalleryTab
