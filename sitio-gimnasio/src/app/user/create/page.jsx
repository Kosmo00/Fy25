import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import Unauthorized from '@/components/unauthorized/Unauthorized'
import CreateUserForm from '@/components/user/CreateUserForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

async function CreateUser() {
  const session = await getServerSession(authOptions)
  if(!session){
    redirect('/auth/login')
  }
  if(!(session?.user?.role === 'admin' || session?.user?.role === 'reception')){
    return <Unauthorized />
  }
  return (
    <div className='flex justify-center pt-10'>
      <div className='card rounded-xl overflow-hidden shadow-2xl mb-10'>
        <div className='card-header principal-bg text-white p-3'>
          <h1 className='mr-5 text-3xl'>Agregar usuario</h1>
        </div>
        <CreateUserForm authenticated_role={session?.user?.role} />
      </div>
    </div>
  )
}

export default CreateUser
