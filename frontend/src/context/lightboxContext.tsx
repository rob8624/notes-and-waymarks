// lightboxContext.tsx
import type { IStrapiMedia } from "#/types/strapi-types"
import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

interface LightBoxContextType {
  images: Array<IStrapiMedia>
  openImageId: number | null
  openLightbox: (id: number) => void
  closeLightbox: () => void
  showNext: () => void
  showPrev: () => void
}

const LighBoxContext = createContext<LightBoxContextType | null>(null)

interface LightBoxProviderProps {
  images: Array<IStrapiMedia>
  children: ReactNode
}

export const LightBoxProvider = ({ images, children }: LightBoxProviderProps) => {
  const [openImageId, setOpenImageId] = useState<number | null>(null)

  const activeIndex = images.findIndex((img) => img.id === openImageId)

  const openLightbox = (id: number) => setOpenImageId(id)
  const closeLightbox = () => setOpenImageId(null)

  const showNext = () => {
    if (activeIndex === -1) return
    const nextIndex = (activeIndex + 1) % images.length
    setOpenImageId(images[nextIndex].id)
  }

  const showPrev = () => {
    if (activeIndex === -1) return
    const prevIndex = (activeIndex - 1 + images.length) % images.length
    setOpenImageId(images[prevIndex].id)
  }

  return (
    <LighBoxContext value={{ images, openImageId, openLightbox, closeLightbox, showNext, showPrev }}>
      {children}
    </LighBoxContext>
  )
}

export const useLightBox = () => {
  const context = useContext(LighBoxContext)

  if (!context) {
    throw new Error('useLightBox must be used within a LightBoxProvider')
  }

  return context
}