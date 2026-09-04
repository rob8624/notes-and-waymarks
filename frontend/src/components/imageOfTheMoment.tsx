import type { IImageOfTheMoment, } from "#/types/strapi-types"

type imageOfTheMomentProps = {
    imageOfTheMoment: IImageOfTheMoment
}



export function ImageOfTheMoment({imageOfTheMoment}: imageOfTheMomentProps)  {
     const image = imageOfTheMoment.image
     const caption = imageOfTheMoment.caption
    
    if (!imageOfTheMoment.visible) {
        return null
    }
    
    
     return (
        <>
            <h2>
                <span className='font-cabin text-3xl bg-primary p-1'>Image</span> 
                <span className='font-albert text-2xl text-gray-500'> of the moment.....</span>
              </h2>
               <p className='m-0 font-albert text-sm pb-4'>{caption}</p>
              <img className="border-2 sm:border-2 max-h-90 sm:max-h-none w-auto object-contain" src={image.formats?.medium?.url ?? image.url} 
              alt={image.alternativeText ?? 'Image of the moment'}  />
           </>   
            
    )
}