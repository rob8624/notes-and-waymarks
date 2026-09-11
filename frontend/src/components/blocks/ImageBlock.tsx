import type { ImageBlock } from "#/types/block-types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-regular-svg-icons'
import { useLightBox } from "#/context/lightboxContext"

const sizeClasses = {
  large: 'w-full',
  medium: 'w-2/3',
  small: 'w-1/3',
}

interface SingleImageProps {
  singleImage: ImageBlock['singleImage']
}

interface ImageCaptionProps {
  imageCaption: ImageBlock['singleImage']['imageCaption']
  maxWidth?: boolean
}

const SingleImage = ({ singleImage }: SingleImageProps) => {
  const { image, settings } = singleImage
  const { imageSize, imageBorder, roundedBorder, grayscale } = settings
  const { openLightbox } = useLightBox()

  const src = image.formats?.[imageSize]?.url || image.url

  const imageClasses = [
    'block',
    'w-full',
    imageBorder && 'border-4 border-black',
    roundedBorder && 'rounded-2xl',
    grayscale && 'grayscale',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="relative">
      <img
        src={src}
        alt={image.alternativeText ?? ''}
        className={imageClasses}
      />

      <button
        onClick={() => openLightbox(image.id)}
        className="absolute bottom-2 right-2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
        aria-label="Open image in lightbox"
      >
        <FontAwesomeIcon icon={faCamera} />
      </button>
    </div>
  )
}

const ImageCaption = ({
  imageCaption,
  maxWidth,
}: ImageCaptionProps) => {
  if (!imageCaption?.caption) return null

  return (
    <figcaption
      className={`
        font-cabin
        text-sm
        tracking-tight
        text-gray-500
        ${maxWidth ? 'max-w-50 min-w-20' : ''}
      `}
    >
      <FontAwesomeIcon icon={faCamera} /> {imageCaption.caption}
    </figcaption>
  )
}

export function SingleImageBlock({ singleImage }: ImageBlock) {
  const caption = singleImage.imageCaption
  const captionPosition = singleImage.imageCaption?.position

  // Width of the image/caption group
  const imageWidth = [
    sizeClasses[singleImage.settings.imageSize],
    'sm:max-w-[70%]',
  ].join(' ')

  switch (captionPosition) {
    case 'bottom':
      return (
        <figure className="flex flex-col items-center p-5">
          <div className={imageWidth}>
            <SingleImage singleImage={singleImage} />
            <ImageCaption imageCaption={caption} />
          </div>
        </figure>
      )

    case 'top':
      return (
        <figure className="flex flex-col items-center p-5">
          <div className={imageWidth}>
            <ImageCaption imageCaption={caption} />
            <SingleImage singleImage={singleImage} />
          </div>
        </figure>
      )

    case 'left':
      return (
        <figure className="flex flex-col items-center gap-1 p-5 md:flex-row md:justify-center">
          <div className="order-2 md:order-1">
            <ImageCaption
              imageCaption={caption}
              maxWidth
            />
          </div>

          <div
            className={`
              order-1
              md:order-2
              ${imageWidth}
            `}
          >
            <SingleImage singleImage={singleImage} />
          </div>
        </figure>
      )

    default:
      return (
        <figure className="flex flex-col items-center p-5">
          <div className={imageWidth}>
            <SingleImage singleImage={singleImage} />
            <ImageCaption imageCaption={caption} />
          </div>
        </figure>
      )
  }
}

