"use client"
import React, { useEffect, useState } from 'react'
import usersPlaceholder from '../../../../public/placeholders/users.json'

function UserList() {
  const [users, setUsers] = useState([])
  // cargar usuarios de placeholder
  useEffect(() => {
    async function getData() {
      setUsers(usersPlaceholder.data)
    }
    getData()
  }, [])
  return (
    <div className='w-[80%] mx-auto'>
      <h2 className='text-4xl flex justify-center mt-5'>
        Lista de usuarios
      </h2>
      <div className="flex flex-col mt-5">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="h-[60vh] rounded-md scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-slate-300 scrollbar-thin overflow-y-scroll">
              <table className="min-w-full text-left text-sm font-light table-top">
                <thead className="sticky top-0 border-b bg-[rgb(64,64,72)] text-white">
                  <tr>
                    <th scope="col" className="px-6 py-4">Foto</th>
                    <th scope="col" className="px-6 py-4">CI</th>
                    <th scope="col" className="px-6 py-4">Nombre</th>
                    <th scope="col" className="px-6 py-4">Descripcion</th>
                    <th scope="col" className="px-6 py-4">Crédito</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.CI} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        <img src={user.foto_perfil} loading="lazy" alt={`profile-pic-${user.nombre}`} className='h-10 w-10 object-fit' />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{user.CI}</td>
                      <td className="whitespace-nowrap px-6 py-4">{user.nombre}</td>
                      <td className="whitespace-nowrap px-6 py-4">{user.rol.nombre}</td>
                      <td className="whitespace-nowrap px-6 py-4">{user.credito.toFixed(2)}</td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserList