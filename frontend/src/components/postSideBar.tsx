import type { IAuthorData, ICategoriesData } from "#/types/strapi-types"




interface PostSideBarProps  {
    author : IAuthorData | null
    publishedDate: string
    updatedDate: string
    className: string
    categories: ICategoriesData[]
}



export function PostSideBar({author, className, publishedDate, categories, updatedDate}:PostSideBarProps) {
    
    const {name, position,} = author ?? {}
    
    const formatDate = (dateString:string) => {
        const options:Intl.DateTimeFormatOptions = { 
            weekday: "long",
            year: "numeric", 
            month: "long", 
            day: "numeric" ,
            timeZone: 'Europe/London',
        }
        return new Date(dateString).toLocaleDateString('en-GB', options)
        }

    const localDate = formatDate(publishedDate)
    const dateUpdated = formatDate(updatedDate)    


    
    return (
        <div className={className}>
            <div className="hidden lg:block text-lg uppercase text-primary bg-black w-fit p-1">{categories.map((item) => item.name)}</div>
            <div className="flex justify-start">
                <div className=" lg:mt-50 md:border-t-2 border-b-2 border-t-2 border-gray-400 
                flex flex-row lg:flex-col gap-5 w-full items-center lg:items-start  ">
                   
                    
                    <div className="flex flex-row lg:gap-1 border-r-2 lg:border-none p-4 lg:p-0 gap-1 items-center text-xs flex-wrap">
                        <div className="flex flex-col">
                                <div className="text-xs opacity-50 italic">Written by</div>
                                <div className="font-cabin font-bold whitespace-nowrap ">{name} </div>
                                <div className="italic text-gray-500">{position}</div>
                        </div>
                        
                    

                    </div>

                    <div className="flex flex-row lg:flex-col lg:gap-2 text-xs flex-wrap items-center lg:items-start h-fit">
                        <div className="flex flex-row lg:flex-col gap-1 m-1 lg:gap-0 lg:m-0 ">
                            <dt className="font-cabin font-bold">Published</dt>
                            <dd><time dateTime={publishedDate}>
                                    {localDate}
                                </time></dd>
                        </div>
                        <div className="flex flex-row  lg:flex-col gap-1 lg:gap-0 lg:m-0 ">
                            <dt className="font-cabin font-bold">Updated</dt>
                            <dd> <time dateTime={updatedDate}>
                                    {dateUpdated}
                                </time>
                                </dd>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <div className="mt-2">
                <button className="p-1 bg-primary text-black border-2">Share</button>
            </div>
            
        </div>
    )
}