import type { CalloutBlockType } from "#/types/block-types"

interface styleChoice {
    backgroundColor: string
    textColor: string
}


const colorStyle: Record<string, styleChoice> = {
  Note: {
    backgroundColor: '#FFFFFF',
    textColor: 'black'
  },
  Tip: {
    backgroundColor: '#E8E890',
    textColor: 'black'
  },
  Warning: {
    backgroundColor: '#EB3838',
    textColor: 'black'
  },
  Danger: {
    backgroundColor: '#0D0000',
    textColor: 'white'
  },
  Success: {
    backgroundColor: '#729DE8',
    textColor: 'black'
  }
}


export function Callout({ content, style, centered }: CalloutBlockType) {
  const calloutStyle = colorStyle[style.trim()]
  const color = calloutStyle.textColor
  const backgroundColor = calloutStyle.backgroundColor

  return (
    <div
      className={`flex w-fit rounded-l-sm border-l-4 p-5 shadow-lg ${centered && 'mx-auto'}` }
      style={{ backgroundColor, color }}
    >
      <div
        className="prose prose-strong:text-inherit max-w-none font-albert leading-7 tracking-normal"
        style={{ color }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}









{/* <div className="prose max-w-none font-albert leading-7 tracking-normal" dangerouslySetInnerHTML={{ __html: content }} /> */}