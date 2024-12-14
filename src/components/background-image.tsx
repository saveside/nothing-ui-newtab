import clsx from "clsx"
import { useImageStore } from "~/store/image-store"
import { useOptionsStore } from "~/store/options"

const BackgroundImage = () => {
  const images = useImageStore((s) => s.images)
  const { bgImageIndex, isMonochromeBg, isBgBlur, isBgImage } =
    useOptionsStore()

  if (!isBgImage || bgImageIndex === null || images.length === 0) {
    return null
  }

  return (
    <>
      <div className="-z-20 fixed size-full bg-white">
        <img
          src={images[bgImageIndex]?.imageUrl}
          style={isMonochromeBg ? { filter: "grayscale(100%)" } : {}}
          alt="background-image"
          loading="lazy"
          className="size-full object-cover"
        />
      </div>
      <div
        className={clsx(
          "-z-10 fixed size-full",
          isBgBlur && "backdrop-blur-md",
        )}
      />
    </>
  )
}

export default BackgroundImage
