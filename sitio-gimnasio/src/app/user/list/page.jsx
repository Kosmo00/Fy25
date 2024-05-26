import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import Unauthorized from '@/components/unauthorized/Unauthorized'
import User from '@/db/models/user'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import UsersTable from '@/components/user/UsersTable'

async function getUsers(params){
  try{
    const users = await User.findAll({
        include: 'role',
        attributes: ['name', 'lastname', 'info', 'CI', 'profile_image'],
        limit: 20,
        raw: true
      })
    return users
  }catch(err){
    console.log(err)
    return null
  }
}

async function UserList() {
  const session = await getServerSession(authOptions)
  if(!session?.user){
    redirect('/auth/login')
  }
  if(!(session.user?.role === 'admin' || session.user?.role === 'reception')){
    return <Unauthorized />
  }
  const users = await getUsers()
  return (
    <div className='w-[80%] mx-auto'>
      <h2 className='text-4xl flex justify-center mt-5'>
        Lista de usuarios
      </h2>
      <div className="flex flex-col mt-5">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="h-[60vh] rounded-md scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-slate-300 scrollbar-thin overflow-y-scroll shadow-xl">
              <UsersTable users={users}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserList