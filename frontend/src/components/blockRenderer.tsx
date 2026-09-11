import { RichtextBlock } from "./blocks/RichtextBlock"
import { SingleImageBlock } from "./blocks/ImageBlock"
import { DividerBlock } from "./blocks/dividerBlock"
import { YoutubeBlock } from "./blocks/youtubeBlock"
import { MulltiImageBlock } from "./blocks/multiImage"

import type { DynamicZoneBlock } from "#/types/block-types"

import { useLightBox } from "#/context/lightboxContext"




interface BlockRendererProps {
    blocks: DynamicZoneBlock[]
}


export function BlockRenderer({blocks}: BlockRendererProps) {


    const { images } = useLightBox()
    console.log('images from context:', images)
  
    const renderBlock = (block: DynamicZoneBlock) => {
        switch(block.__component) {
            case 'blocks.richtext':
                return <RichtextBlock {...block} key={block.id}/>
            case 'blocks.image':
                return <SingleImageBlock {...block} key={block.id} />
            case 'blocks.divider':
                return <DividerBlock {...block} key={block.id} />
             case 'blocks.youtube':
                return <YoutubeBlock {...block} key={block.id} />
             case 'blocks.multiple-images':
                return <MulltiImageBlock {...block} key={block.id} />
        }
    }
  
    return <div className="flex flex-col items-center justify-center p-1">{blocks.map((block, index) => <div className="mb-2 w-full" key={`${block.__component}-${block.id}-${index}`}>{renderBlock(block)}</div>)}</div>
}   