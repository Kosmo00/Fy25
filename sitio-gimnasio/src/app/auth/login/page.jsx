import React from 'react'
import LoginForm from '@/components/login/LoginForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

async function Login() {
    const session = await getServerSession()
    if(session?.user){
        redirect('/')
    }
    return (
        <div className='flex justify-center pt-10'>
            <div className='card rounded-xl overflow-hidden shadow-lg mb-10 sm:w-96 w-80'>
                <div className='card-header principal-bg text-white p-3'>
                    <h1 className='text-3xl'>Inicia sesión</h1>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login