
import { Link } from '@tanstack/react-router'
import type { IPostData } from "#/types/strapi-types"





export function PostCard({title, slug, categories, summary, featuredImage}: IPostData) {
    return (
        <div className="flex flex-col m-2 lg:flex-row md:justify-center md:items-center hover:scale-105 ">
            <div className="flex bg-primary/60  border-2 rounded-md min-h-60  md:w-[700px] lg:w-[500px]" >
                <div className="flex flex-col flex-1  ml-10 bg-white p-2">   
                    <div className="flex-1 flex justify-start items-end border-b-2 font-cabin font-bold text-2xl">
                        {title}
                    </div>
                    <div className="flex-2 font-albert text-grey-100">{summary}</div>
                    <div>{categories.map(item => item.name)}</div>
                    
                </div> 
            <div className="flex-1 flex justify-end items-end p-4 text-on-primary">
                    <Link to="/posts/$postSlug" params={{ postSlug: slug }}>Read</Link>
                </div>
            </div>
        </div>
)
}