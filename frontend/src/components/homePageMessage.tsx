import type { BlocksContent } from '@strapi/blocks-react-renderer'
import { RichTextRenderer } from '#/components/richTextRenderer' // 





export function HomePageMessage ({data}: {data: BlocksContent}) {
    return (<div className='lg:pb-4 font-albert'> 
    <RichTextRenderer data={data}/>
      </div>)
    
    
}