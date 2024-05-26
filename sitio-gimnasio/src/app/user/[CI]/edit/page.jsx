import ServerError from '@/components/serverError/ServerError'
import EditUserForm from '@/components/user/EditUserForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import React from 'react'
import User from '@/db/models/user'
import { redirect } from 'next/navigation'

async function getUserData(CI){
  try{
    const user = await User.findOne({where: {CI}, raw: true})
    delete user['password']
    delete user['updatedAt']
    delete user['createdAt']
    delete user['role_id']
    return user
  }catch(err){
    console.log(err)
    return null
  }
}

async function EditUserPage({params}) {
  const CI = params.CI
  const session = await getServerSession(authOptions)
  if(!session){
    redirect('/auth/login')
  }
  const user = await getUserData(CI)

  if(!user){
    return <ServerError />
  }
  if(!(session?.user?.role === 'admin' || session?.user?.role === 'reception' || user.email === session?.user?.email )){
    return <Unauthorized />
  }
  return (
    <div className='flex justify-center pt-10'>
      <div className='card rounded-xl overflow-hidden shadow-2xl mb-10'>
        <div className='card-header principal-bg text-white p-3'>
          <h1 className='mr-5 text-3xl'>Editar usuario</h1>
        </div>
        <EditUserForm user={user} />
      </div>
    </div>
  )
}

export default EditUserPage