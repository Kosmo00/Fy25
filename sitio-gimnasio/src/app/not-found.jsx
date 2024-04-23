import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='pt-20 flex items-center justify-center w-full h-full'>
            <div className='text-center'>
                <h2 className='text-3xl'>Página no encontrada</h2>
                <p className='py-5'>No fue posible encontrar la página pedida</p>
                <Link href="/" className='text-white'>Atrás</Link>

            </div>
        </div>
    )
}