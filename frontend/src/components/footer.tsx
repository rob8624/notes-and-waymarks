import { Route as RootRoute } from '@/routes/__root'



export default function Footer() {
    const { footer } = RootRoute.useLoaderData()

    return(
    <footer className='flex justify-center bg-yellow-300'>
        <div>{footer.message}</div>
    </footer>
)
}