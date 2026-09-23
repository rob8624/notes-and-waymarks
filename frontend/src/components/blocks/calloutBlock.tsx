import type { CalloutBlockType } from "#/types/block-types"
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleInfo,
  faLightbulb,
  faTriangleExclamation,
  faCircleXmark,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons'


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
    backgroundColor: '#FA7A7A',
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


const calloutIcons: Record<string, IconDefinition> = {
  Note: faCircleInfo,
  Tip: faLightbulb,
  Warning: faTriangleExclamation,
  Danger: faCircleXmark,
  Success: faCircleCheck,
}


export function Callout({ content, style, centered }: CalloutBlockType) {
  const calloutStyle = colorStyle[style.trim()]
  const icon = calloutIcons[style.trim()]
  const color = calloutStyle.textColor
  const backgroundColor = calloutStyle.backgroundColor

  return (
    <div
      className={`flex flex-col gap-4 w-fit rounded-l-sm border-l-4 p-5 mb-5 shadow-lg ${centered && 'mx-auto'}` }
      style={{ backgroundColor, color }}
    >
         <div className="flex gap-1">
            <div>{style}</div>
        <FontAwesomeIcon
            icon={icon}
            className="mt-1 shrink-0"
        />   
      </div>
      <div
        className="prose prose-strong:text-inherit max-w-none font-albert leading-7 tracking-normal"
        style={{ color }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}









{/* <div className="prose max-w-none font-albert leading-7 tracking-normal" dangerouslySetInnerHTML={{ __html: content }} /> */}