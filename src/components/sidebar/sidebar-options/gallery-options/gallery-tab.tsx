import { Icon } from "@iconify/react"
import { set } from "idb-keyval"
import { useCallback, useEffect, useRef, useState } from "react"
import Button from "~/components/ui/button"
import Input from "~/components/ui/input"
import { useImageStore } from "~/store/image-store"
import type { ImageFile } from "~/types"
import NewTabHeader from "../shared/newtab-header"

const GalleryTab = () => {
  const { images, addImages, removeImage, shouldSave, saveImagesToDB } =
    useImageStore()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleOnSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const newImages: ImageFile[] = Array.from(files).map((file) => ({
        file,
        name: file.name,
        type: file.type,
      }))
      addImages(newImages)
    }
  }

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
              variant={shouldSave ? "accent" : "secondary"}
              size="icon"
              icon="mdi:content-save-all"
              onClick={saveImagesToDB}
              disabled={images.length === 0}
            />
          </>
        }
      />

      {images?.length > 0 ? (
        <div className="flex flex-col gap-3">
          {images?.map((img) => (
            <span key={img.name} className="group relative">
              <img
                loading="lazy"
                className="rounded-xl"
                src={URL.createObjectURL(img.file)}
                alt="gallary-image"
              />
              <Button
                variant="destructive"
                icon="tabler:trash"
                size="icon"
                className="absolute top-2 right-3 hidden group-hover:flex"
                onClick={() => removeImage(img.name)}
              />
            </span>
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
