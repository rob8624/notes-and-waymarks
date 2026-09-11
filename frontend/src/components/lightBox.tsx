import { useLightBox } from "#/context/lightboxContext"




export function Lightbox() {
  const { images, openImageId, closeLightbox, showNext, showPrev } = useLightBox()

  if (openImageId === null) return null

  const activeImage = images.find((img) => img.id === openImageId)
  if (!activeImage) return null

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={closeLightbox}
    >
      <button
        onClick={(e) => { e.stopPropagation(); showPrev() }}
        className="absolute left-4 text-white text-3xl p-2"
        aria-label="Previous image"
      >
        ‹
      </button>

      <img
        src={activeImage.formats?.large?.url ?? activeImage.url}
        alt={activeImage.alternativeText ?? ''}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw]"
      />
      <div>{activeImage.caption}</div>

      <button
        onClick={(e) => { e.stopPropagation(); showNext() }}
        className="absolute right-4 text-white text-3xl p-2"
        aria-label="Next image"
      >
        ›
      </button>
      
    </div>
  )
}