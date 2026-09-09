
import type { MultiImageBlockType } from "#/types/block-types"

interface MultiImageProps {
 images: MultiImageBlockType['images']
}



export function MulltiImageBlock({images}:MultiImageProps){
    if (!images) {
        return null;
    }
    return(
        
        <div className="columns-3 flex justify-center gap-2 flex-wrap"> {images.map((item) => 
            
        <img className="object-contain w-80" src={item.formats?.medium?.url || item.url }  />
        
        
    )} </div>
    )
}