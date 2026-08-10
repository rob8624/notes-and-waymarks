import { Route as RootRoute } from '@/routes/__root'



export default function Footer() {
    const { footer } = RootRoute.useLoaderData()

    return(
    <footer className='flex justify-center mt-10'>
        <div>{footer.message}</div>
    </footer>
)
}