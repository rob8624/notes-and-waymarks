import { Route as RootRoute } from '@/routes/__root'

export default function Header() {
    const { header } = RootRoute.useLoaderData()




    return(
    <header>
        <div className='flex flex-col items-center sm:flex-row sm:justify-between sm:min-h-30 '>
            <img className="sm:self-end mt-5" src={header.logo.formats?.thumbnail?.url}/>
             <nav className='sm:self-end'>
                <ul className='flex gap-2'>
                    {header.menu.map(item => 
                        <li >{item.label}</li>
                    )}
                </ul>
            </nav>
        </div>
        <div className='h-5 bg-[#E0FAFF] rounded-2xl'></div>
        <div className='flex justify-center sm:block'>
            <div className='font-cabin sm:text-2xl text-gray-600'>{header.heading}</div>
        </div>
        
    </header>
)
}