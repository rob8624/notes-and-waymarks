import type { DividerBlock } from "#/types/block-types"


interface DividerBlockProps {
    style: DividerBlock['style']
}

export function DividerBlock({style}:DividerBlockProps) {
    
   const dividerStyle = style.toLowerCase()

    return (
        <div className="w-full">
    <hr className={`${dividerStyle} w-full`} />
    </div>

)
}