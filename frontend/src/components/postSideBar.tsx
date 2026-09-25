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
            <div className="hidden lg:block text-lg  uppercase  w-fit p-1">
                <div className="flex gap-4 flex-wrap">
                    {categories.map((item) => 
                    <div className="  text-on-primary bg-primary  p-1 text-sm" key={item.id}>{item.name}</div>)}
                </div>
                </div>
            <div className="flex justify-start">
                <div className=" lg:mt-50 md:border-t-2 border-b-2 border-t-2 border-gray-400 
                flex flex-row lg:flex-col gap-5 w-full items-center lg:items-start  ">
                   

                    <div className="grid grid-cols-[auto_1fr] lg:grid-rows-2 lg:grid-cols-1  gap-4">
                        <div className="border-r-2 lg:border-r-0 p-2">
                            <div className="opacity-50 italic">Written by</div>
                            <div className="font-cabin font-bold whitespace-nowrap ">{name} </div>
                            <div className="italic text-gray-500">{position}</div>
                        </div>
                        <div className="">
                            <dt className="font-cabin font-bold text-xs">Published</dt>
                            <dd><time dateTime={publishedDate}>
                                {localDate}
                            </time></dd>
                            <dt className="font-cabin font-bold text-xs">Updated</dt>
                            <dd> <time dateTime={updatedDate}>
                                {dateUpdated}
                            </time>
                            </dd>
                        </div>

                    </div>

                    
                </div>
                
            </div>
            <div className="mt-2">
                <button className="p-1 bg-primary border-2 text-on-primary">Share</button>
            </div>

            
        </div>
    )
}