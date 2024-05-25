import LeftSide from '@/components/userProfile/LeftSide';
import RightSide from '@/components/userProfile/RightSide';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import User from '@/db/models/user';
import ServerError from '@/components/serverError/ServerError';

async function getUserData(email){
  try{
    const user = await User.findOne({where: {email}, raw: true})
    delete user['password']
    delete user['updatedAt']
    delete user['createdAt']
    delete user['role_id']
    console.log(user.info)
    return user
  }catch(err){
    console.log(err)
    return null
  }
}

async function UserProfile(){
  const session = await getServerSession(authOptions)
  if(!session?.user){
    redirect('/auth/login')
  }
  const user = await getUserData(session.user?.email)
  if(!user){
    return <ServerError />
  }
  return (
    <div className='grid lg:grid-cols-2 mt-[-10vh] bg-neutral-800'>
      <div className='lg:h-[100vh] lg-absolute'>
        <div className='px-5 text-white w-full h-full lg:overflow-y-auto pt-[10vh] pb-20 overflow-x-hidden text-lg md:ml-50'>
          <LeftSide user={user} role={session.user.role} />
        </div>
      </div>
        <div className='bg-[#d5ebd4] h-[100vh] rounded-t-[40px] lg:rounded-t-none pt-[10vh]'>
          {
            session.user.role === 'athlete'
            &&
            <RightSide />
          }
        </div>
    </div>
  )
}

export default UserProfile;
