import { Route as RootRoute } from '@/routes/__root'
import { Link } from '@tanstack/react-router'
import { useTheme } from '#/context/themeContext'


interface ThemePickerType {
    blue : string
    orange : string
    black : string

}

export default function Header() {
    const { header } = RootRoute.useLoaderData()
  
    const { theme, selectTheme } = useTheme()

   const themeColors = {
    blue: '#E0FAFF',
    orange: '#e89527',
    black: '#050505',
}
    

     const ThemePicker = () => {
    return (
        <div className="flex gap-4">
            {Object.entries(themeColors).map(([name, color]) => (
                <button
                    key={name}
                    type="button"
                    onClick={() => selectTheme(name as theme)}
                    className="h-5 w-5 rounded-full"
                    style={{ backgroundColor: color }}
                />
            ))}
        </div>
    )
}



    return(
    <header>
        <div className='flex flex-col items-center sm:flex-row sm:justify-between  '>
            <Link to='/' >
            <img className="sm:self-end mt-5" src={header.logo.formats?.thumbnail?.url}
            alt={header.logo.alternativeText ?? "Notes and Waymarks logo"}/>
            </Link>
             <nav className='sm:self-end'>
                <ul className='flex gap-2'>
                    {header.menu.map(item => 
                        <li key={item.id}>{item.label}</li>
                    )}
                </ul>
            </nav>
        </div>
        <div className='h-5 bg-primary rounded-2xl'></div>
        <div className='flex justify-center flex-col items-center sm:block'>
            <div className='font-cabin text-lg sm:text-2xl text-gray-600'>{header.heading}</div>
            <ThemePicker />
        </div>
        
    </header>
)
}