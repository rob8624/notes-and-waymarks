import type { ISiteSettingsData } from "#/types/strapi-types"

type imageOfTheMomentProps = {
    siteSettings: ISiteSettingsData
}



export function ImageOfTheMoment({siteSettings}: imageOfTheMomentProps)  {
    return (
        <>
            <h2>
                <span className='font-cabin text-4xl italic'>Image</span> 
                <span className='font-albert text-2xl text-gray-500'> of the moment.....</span>
              </h2>
               <p className='m-0 font-albert text-sm pb-4'>{siteSettings.momentImage.caption}</p>
              <img className="border-2 sm:border-4 max-h-90 sm:max-h-none w-auto object-contain" src={siteSettings.momentImage.formats?.medium?.url ?? siteSettings.momentImage.url} 
              alt={siteSettings.momentImage.alternativeText ?? 'Image of the moment'}  />
           </>   
            
    )
}