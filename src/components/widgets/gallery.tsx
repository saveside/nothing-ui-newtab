const placeholder =
  "https://images.pexels.com/photos/3419791/pexels-photo-3419791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

const Gallery = () => {
  return (
    <div className="h-48 w-96 rounded-xl bg-card p-3">
      <div
        className="size-full rounded-lg"
        style={{
          background: `url(${placeholder}) no-repeat center center/cover`,
        }}
      />
    </div>
  )
}

export default Gallery
