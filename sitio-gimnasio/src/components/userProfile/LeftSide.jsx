'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function LeftSide({user, role}) {
  return (
    <>
    <div className='px-10 mt-10 flex flex-col items-center'>
        <div className='flex'>
            <div className='block pr-5'>
            <Image src={user.profile_image} alt="Foto de perfil" className='rounded-lg border-dashed border-[5px]' width={200} height={200} />
            </div>
            <div className='mt-10'>
            <p>{user.name}</p>
            <p>{user.lastname}</p>
            </div>
        </div>
        <div>

        <div className='mt-10 md:text-2xl text-lg'>
            <input className='text-black text-xl p-2 bg-white w-full rounded-md' type='email' value={user.email} disabled/>
        </div>
        <div className='flex mt-3 md:text-2xl text-lg items-center'>
            <label className='mr-2'>C.I.</label>
            <input className='text-black text-xl p-2 bg-white rounded-md w-full ' type='text' value={user.CI} disabled/>
        </div>
        <div className='flex mt-3 md:text-2xl text-lg items-center'>
            <label className='mr-2'>Teléfono</label>
            <input className='text-black text-xl p-2 bg-white rounded-md w-full' type='text' value={user.phone} disabled/>
        </div>
        {
            role === 'athlete'
            &&
            <div className='flex mt-3 md:text-2xl text-lg items-center'>
                <label className='mr-2'>Balance</label>
                <input 
                className='text-black text-xl p-2 bg-white rounded-md w-full' 
                type='text' 
                value={(user.info.deposited_money - user.info.payed_money) / 100 + ' CUP'} 
                disabled/>
            </div>
        }
        {
            role === 'trainer'
            &&
            <div className='flex mt-3 md:text-2xl text-lg items-center'>
                <label className='mr-2'>Ganancia</label>
                <input 
                className='text-black text-xl p-2 bg-white rounded-md w-full' 
                type='text' 
                value={(user.info.amount_earned - user.info.amount_charged) / 100 + ' CUP'} 
                disabled/>
            </div>
        }
        <div className='mt-5'>
            <Link href={`/user/${user.CI}/edit`} className='text-xl block w-full bg-white text-black py-2 rounded-lg text-center'>Actualizar datos</Link>
            <Link href='/user/change_password' className='text-xl block w-full bg-white text-black py-2 rounded-lg text-center mt-5'>Cambiar contraseña</Link>
            <Link href='/' className='text-xl block w-full bg-white text-black py-2 rounded-lg text-center mt-5'>Registros</Link>
        </div>
        </div>
    </div>
    </>
  )
}

export default LeftSide