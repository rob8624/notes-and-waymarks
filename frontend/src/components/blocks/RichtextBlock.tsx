import { RichTextRenderer } from "../richTextRenderer";





export function RichtextBlock({ richtext }: { richtext: string }) {
  return <div className="prose max-w-none font-albert leading-7 tracking-normal" dangerouslySetInnerHTML={{ __html: richtext }} />
}