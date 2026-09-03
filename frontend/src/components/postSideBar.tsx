import type { IAuthorData } from "#/types/strapi-types"




interface PostSideBarProps  {
    author : IAuthorData | null
    publishedDate: string
    className: string
}



export function PostSideBar({author, className, publishedDate}:PostSideBarProps) {
    
    const {name, position,} = author ?? {}
    
    const formatDate = (dateString:string) => {
        const options:Intl.DateTimeFormatOptions = { 
            weekday: "long",
            year: "numeric", 
            month: "long", 
            day: "numeric" 
        }
        return new Date(dateString).toLocaleDateString(undefined, options)
        }

    const localDate = formatDate(publishedDate)    


    
    return (
        <div className={className}>
            <div className=" p-2 md:mt-50 md:border-t-2 border-b-2 border-gray-400">
                <span className="font-cabin font-bold text-lg">{name} </span>
                <span className="italic text-gray-500">{position}</span>
                <div>{localDate}</div>
            </div>
        </div>
    )
}