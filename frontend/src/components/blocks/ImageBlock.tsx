import type { ImageBlock } from "#/types/block-types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-regular-svg-icons'

const sizeClasses = {
  large: 'w-full',
  medium: 'w-2/3 ',
  small: 'w-1/3',
}


interface SingleImageProps  {
    singleImage: ImageBlock['singleImage']
  }

interface ImageCaptionProps {
  imageCaption: ImageBlock['singleImage']['imageCaption']

   /**
   * Limits the caption width when enabled.
   * Used mainly when the caption is positioned beside the image. To note prop could be
   * shortened to maxWidth instead of maxWidth={true} but I prefer the readabililty
   */
  maxWidth?: boolean
}


 const SingleImage = ({singleImage}:SingleImageProps) => {
    const { image, settings } = singleImage
    const { imageSize, imageBorder, roundedBorder, grayscale } = settings
    const src = image.formats?.[imageSize]?.url || image.url

    const classes = [
    sizeClasses[imageSize],
    'md:order-2',
    'md:max-w-[70%]',
    imageBorder && 'border-4 border-black',
    roundedBorder && 'rounded-2xl',
    grayscale && 'grayscale'
  ]
    .filter(Boolean)
    .join(' ')


    return (<img src={src} alt={image.alternativeText ?? ''} className={classes} />)
 }

 const ImageCaption = ({imageCaption, maxWidth}:ImageCaptionProps) => {
    if (!imageCaption?.caption) return null

    return (
      <>
      
        <figcaption className={`${ maxWidth ? 'max-w-50 min-w-20' : null } md:order-1  font-cabin text-gray-500 tracking-tigh text-sm self-center`}>
          <FontAwesomeIcon icon={faCamera} />{imageCaption?.caption}
        
        </figcaption>
        
      </>
    )
 }







  export function SingleImageBlock({ singleImage }: ImageBlock) {

 
  
  

     const caption = singleImage.imageCaption
     const captionPosition = singleImage.imageCaption?.position

  
    
  
  
  
  
  
    






    switch(captionPosition) {
        case "bottom":
           return ( 
           <figure className="flex flex-col items-center p-5">
            <SingleImage singleImage={singleImage}/> 
            <ImageCaption imageCaption={caption} />
          </figure>)
        case "top": 
        return (
           <figure className="flex flex-col items-center p-5">
            
            <SingleImage singleImage={singleImage}/> 
            <ImageCaption imageCaption={caption} />
          </figure>)
           case "left": 
        return (
           <figure className="flex justify-center items-center p-5 flex-col md:flex-row gap-1">
              <SingleImage singleImage={singleImage}/> 
              <ImageCaption imageCaption={caption} maxWidth={true} />
            </figure>
            )
        
        default:
      return (
     <figure className="flex flex-col items-center p-5">
          <SingleImage singleImage={singleImage}/> 
          <ImageCaption imageCaption={caption}/>
        </figure>
        
    )

}



   

}


