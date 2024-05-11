import React from 'react'
import RegisterForm from '@/components/register/RegisterForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

async function Register() {
    const session = await getServerSession()
    if(session?.user){
        redirect('/')
    }
    return (
        <div className='flex justify-center pt-10'>
            <div className='card rounded-xl overflow-hidden shadow-2xl mb-10'>
                <div className='card-header principal-bg text-white p-3'>
                    <h1 className='text-3xl'>Inscríbete</h1>
                </div>
                <RegisterForm />
            </div>
        </div>
    )
}

export default Register