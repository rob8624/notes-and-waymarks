import { RichtextBlock } from "./blocks/RichtextBlock"
import { SingleImageBlock } from "./blocks/ImageBlock"
import type { DynamicZoneBlock } from "#/types/block-types"




interface BlockRendererProps {
    blocks: DynamicZoneBlock[]
}


export function BlockRenderer({blocks}: BlockRendererProps) {
  
    const renderBlock = (block: DynamicZoneBlock) => {
        switch(block.__component) {
            case 'blocks.richtext':
                return <RichtextBlock {...block} key={block.id}/>
            case 'blocks.image':
                return <SingleImageBlock {...block} key={block.id} />
        }
    }
  
    return <div className="flex flex-col items-center justify-center p-1">{blocks.map((block, index) => <div className="mb-2" key={`${block.__component}-${block.id}-${index}`}>{renderBlock(block)}</div>)}</div>
}   