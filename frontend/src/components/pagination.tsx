
import { Link } from '@tanstack/react-router'



type PaginationProps = {
    page: number,
    totalPages: number
}





export function Pagination({ page, totalPages }:PaginationProps) {

    
    
    

    return (
        <div className='flex gap-5 justify-center'>
            <div className='font-albert text-lg'>page {page} of {totalPages}</div>
            
            <div className='font-albert text-lg'>

            {page < totalPages && (
                <Link
                    to="."
                    search={(prev) => ({ ...prev, page: page + 1 })}
                >
                    Next page
                </Link>
            )}

            </div>

            <div className='font-albert text-lg'>

            {page > 1 && (
                <Link
                    to="."
                    search={(prev) => ({ ...prev, page: page - 1 })}
                >
                    Prev page
                </Link>
            )}
            
            </div>

            
        </div>
    )
}