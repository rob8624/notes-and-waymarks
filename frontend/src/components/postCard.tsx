
import { Link } from '@tanstack/react-router'
import type { IPostData } from "#/types/strapi-types"





export function PostCard({title, slug, categories, summary, featuredImage}: IPostData) {
    return (
        <div className="flex flex-col m-2 lg:flex-row md:justify-center md:items-center  ">
            <div className="flex bg-primary/60  border-2 rounded-md min-h-60 md:w-[700px] lg:w-[500px]" >
                <div className="flex flex-col flex-1  ml-10 bg-white p-2 min-w-[200px]">   
                    <div className="flex-1 flex justify-start items-end border-b-2 font-cabin font-bold text-2xl pb-2">
                        {title}
                    </div>
                    <div className="flex-2 font-albert text-grey-100 text-sm pb-1">{summary}</div>
                    <div className='flex gap-1 flex-wrap'>{categories.map(item => <div key={item.id} className='bg-primary text-on-primary  rounded-sm p-1 font-albert capitalize'>{item.name}</div>)}</div>
                    
                </div> 
            <div className="flex-1 flex justify-end items-end md:pr-10 text-on-primary">
                    <Link to="/posts/$postSlug" params={{ postSlug: slug }} className=' h-10 
                    pr-5 pl-5 border-t-2 border-r-2 border-l-2 rounded-t-lg font-albert hover:scale-120 hover:border-b-2 '>
                    Read
                    </Link>
                </div>
            </div>
        </div>
)
}