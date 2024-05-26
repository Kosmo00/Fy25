'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

function traduceRole(role){
  if(role === 'athlete'){
    return 'Atleta'
  }
  if(role === 'qr-scanner'){
    return 'Scan QR'
  }
  if(role === 'trainer'){
    return 'Entrenador'
  }
  if(role === 'reception'){
    return 'Recepción'
  }
  if(role === 'admin'){
    return 'Administrador'
  }
}

function UsersTable({users}) {
  const router = useRouter()
  return (
  <table className="min-w-full text-left text-sm font-light table-top">
    <thead className="sticky top-0 border-b bg-[rgb(64,64,72)] text-white">
      <tr>
      <th scope="col" className="px-6 py-4">Foto</th>
      <th scope="col" className="px-6 py-4">CI</th>
      <th scope="col" className="px-6 py-4">Nombre</th>
      <th scope="col" className="px-6 py-4">Rol</th>
      <th scope="col" className="px-6 py-4">Crédito</th>
      </tr>
    </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.CI} onClick={() => {router.push(`/user/${user.CI}`)}}
          className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 cursor-pointer">
          <td className="whitespace-nowrap px-6 py-4 font-medium">
            <img src={user.profile_image} loading="lazy" alt={`profile-pic-${user.name + ' ' + user.lastname}`} className='h-[70px] w-[70px] object-fit' />
          </td>
          <td className="whitespace-nowrap px-6 py-4">{user.CI}</td>
          <td className="whitespace-nowrap px-6 py-4">{user.name + ' ' + user.lastname}</td>
          <td className="whitespace-nowrap px-6 py-4">{traduceRole(user['role.name'])}</td>
          {
            user['role.name'] === 'athlete'
            &&
            <td className="whitespace-nowrap px-6 py-4">{(user.info.deposited_money - user.info.payed_money) / 100 + ' CUP'}</td>
          }
          {
            user['role.name'] === 'trainer'
            &&
            <td className="whitespace-nowrap px-6 py-4">{(user.info.amount_earned - user.info.amount_charged) / 100 + ' CUP'}</td>
          }
          {
            user['role.name'] !== 'trainer' && user['role.name'] !== 'athlete'
            &&
            <td className="whitespace-nowrap px-6 py-4">0 CUP</td>
          }
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UsersTable