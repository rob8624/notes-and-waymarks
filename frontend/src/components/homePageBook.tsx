import type { IHomePageBook } from "#/types/strapi-types"

type HopePageBookProps = {
    data : IHomePageBook
}


export function HomePageBook( { data }  : HopePageBookProps ) {
    return (
        
        <>
           <h2>
                <span className='font-cabin text-4xl italic'>Book</span> 
                <span className='font-albert text-2xl text-gray-500'> of the moment.....</span>
              </h2>
            <div className="flex flex-row gap-5 pt-4">
                <div>
                    <img className="border-2 h-40"  src={data.image.formats?.small?.url ?? data.image.url } 
                    alt={data.image.alternativeText ?? 'book of the moment image'}/>
                </div>
                <div className="flex flex-col">
                     <div className="flex flex-wrap gap-x-1 gap-y-0 items-center">
                        <div className="font-cabin font-bold text-lg">{data.bookName}</div>
                        <div className="font-albert text-gray-500"> by {data.author}</div>
                    </div>
                        <div className="font-albert text-sm pt-2">{data.summary}</div>
                </div>
        </div>
        </>
       

    )
}