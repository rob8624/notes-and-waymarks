import { RichTextRenderer } from "../richTextRenderer";





export function RichtextBlock({ richtext }: { richtext: string }) {
  return <div className="prose max-w-none font-albert" dangerouslySetInnerHTML={{ __html: richtext }} />
}