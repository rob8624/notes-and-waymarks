
import { Link } from '@tanstack/react-router'
import {
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



type PaginationProps = {
    page: number,
    totalPages: number
}





export function Pagination({ page, totalPages }:PaginationProps) {

    
    const pageNumbers = Array.from({length: totalPages}, (x, i) => i + 1)
    

    return (
        <>
        <div className='flex gap-5 justify-center'>
            <div className='font-albert text-lg'>{page} / {totalPages}</div>
            
            <div className='font-albert text-lg'>

             {page > 1 && (
                <Link
                    to="."
                    search={(prev) => ({ ...prev, page: page - 1 })}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
            )}

            </div>

            <div className='font-albert text-lg'>

           {page < totalPages && (
                <Link
                    to="."
                    search={(prev) => ({ ...prev, page: page + 1 })}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </Link>
            )}
            
            </div>
   
            
        </div>
        <div className='flex flex-row gap-2'>
            <div className='font-bold'>Jump to:</div>
        {pageNumbers.map((item) => 
        <Link key={item} to="." search={(prev) => ({ ...prev, page: item})} >
            
            <div className={item == page ? 'opacity-100' : 'opacity-26' }>{item} |</div>
        </Link>
        
        )}
        </div>
        </>
    )
}



 