import React from 'react'
import User from '@/db/models/user'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import Unauthorized from '@/components/unauthorized/Unauthorized'
import LeftSide from '@/components/userProfile/LeftSide'
import ActionsOverUsers from '@/components/user/ActionsOverUsers'

async function getUserByCI(CI){
    try{
        const user = await User.findOne({where: {CI}, raw: true, include: 'role', attributes: ['id', 'name', 'lastname', 'info', 'email', 'CI', 'profile_image', 'phone']})
        return user
    } catch(err){
        console.log(err)
        return null
    }
}

async function UserPage({params}) {
  const CI = params.CI
  const session = await getServerSession(authOptions)
  if(!session?.user){
      redirect('/auth/login')
  }
  if(!(session?.user?.role === 'admin' || session?.user?.role === 'reception')){
    return <Unauthorized />
  }
  const user = await getUserByCI(CI)
  return (
    <div className='grid lg:grid-cols-2 mt-[-10vh] bg-neutral-800'>
      <div className='lg:h-[100vh] lg-absolute'>
        <div className='px-5 text-white w-full h-full lg:overflow-y-auto pt-[10vh] pb-20 overflow-x-hidden text-lg'>
          <LeftSide user={user} role={user['role.name']} />
        </div>
      </div>
      <div className='bg-[#d5ebd4] h-[100vh] rounded-t-[40px] lg:rounded-t-none pt-[10vh]'>
        <ActionsOverUsers user={user} role={user['role.name']} />
      </div>
    </div>
  )
}

export default UserPage