import React from 'react'
import User from '@/db/models/user'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

async function getUserByCI(CI){
    try{
        const user = await User.findOne({where: {CI}})
        return {
            error: false,
            user
        }
    } catch(err){
        console.log(err)
        return {
            error: true
        }
    }
}

async function UserPage({params}) {
    const CI = params.CI
    const session = await getServerSession(authOptions)
    const {user, error} = await getUserByCI(CI)
    return (
        <>
            {/* User info section */}
            <div className='mt-10'>
                <label>Asistencias</label>
                <button></button>
            </div>
        </>
    )
}

export default UserPage