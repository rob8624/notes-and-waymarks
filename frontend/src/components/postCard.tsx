import type { IPostData } from "#/types/strapi-types"





export function PostCard({title, slug, categories, summary, featuredImage}: IPostData) {
    return (
        <div className="flex flex-col m-2 lg:flex-row lg:justify-center lg:items-center ">
            <div className="flex bg-primary border-2 rounded-md min-h-60 lg:w-[70%]" >
                <div className="flex flex-col flex-1  ml-10 bg-white p-2">   
                    <div className="flex-1 flex justify-start items-end border-b-2 font-cabin font-bold text-2xl">
                        {title}
                    </div>
                    <div className="flex-2 font-albert text-grey-100">{summary}</div>
                    <div>{categories.map(item => item.name)}</div>
                </div> 
            <div className="flex-1 flex justify-end items-end p-4">
                    <button>Read</button>
                </div>
            </div>
        </div>
)
}