import { AnimatePresence, motion } from "framer-motion"
import { wrap } from "framer-motion"
import { useCallback, useEffect } from "react"
import { useState } from "react"
import { useImageStore } from "~/store/image-store"
import { useOptionsStore } from "~/store/options"

const Gallery = () => {
  const { loading, images } = useImageStore()

  const { isMonochromeWidgetImg } = useOptionsStore()
  const [selectedImage, setSelectedImage] = useState(0)
  const imageIndex = wrap(0, images.length, selectedImage)

  const next = useCallback(() => {
    setSelectedImage((prev) => {
      if (images.length - 1 === prev) {
        return 0
      }
      return prev + 1
    })
  }, [images])

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>
    if (images.length > 0) {
      intervalId = setInterval(() => next(), 10000)
    }
    return () => clearInterval(intervalId)
  }, [images, next])

  return (
    <div className="h-48 w-96 rounded-xl bg-card p-3">
      <div
        className="size-full overflow-hidden rounded-lg"
        style={isMonochromeWidgetImg ? { filter: "grayscale(100%)" } : {}}
      >
        {images.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={imageIndex}
              initial={{ y: 40, scale: 0.4 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -200, scale: 0.6 }}
              transition={{ ease: "linear", duration: 0.3 }}
              src={images[selectedImage].imageUrl}
              alt={images[0].name}
              className="size-full rounded-lg object-cover object-top"
            />
          </AnimatePresence>
        ) : (
          !loading && (
            <img
              src="https://res.cloudinary.com/stylesh/image/upload/f_auto,q_auto/v1/placeholder/vxuhoiscbldol8nlg94x"
              alt="fallback-image"
            />
          )
        )}
      </div>
    </div>
  )
}

export default Gallery
