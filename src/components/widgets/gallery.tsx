import { useOptionsStore } from "../../store/options"

const Gallery = () => {
  const image = useOptionsStore((s) => s.image)
  return (
    <div className="h-48 w-96 rounded-xl bg-card p-3">
      <div
        className="size-full rounded-lg"
        style={{
          background: `url(${image}) no-repeat center center/cover`,
        }}
      />
    </div>
  )
}

export default Gallery
