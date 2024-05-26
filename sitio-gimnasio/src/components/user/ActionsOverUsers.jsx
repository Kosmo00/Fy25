'use client'
import React from 'react'

function AthleteOptions({role, user}){
  if(role === 'athlete'){
    return (
      <>
        <div className='block'>
          <label className='text-2xl'>Saldo a agregar</label><br />
          <input type='text' className='mt-3 text-black text-xl p-2 bg-white rounded-md w-[320px] sm:w-[350px] border-2 border-black' />
           <button className='text-xl block w-[320px] sm:w-[350px] bg-green-500 hover:bg-green-700 text-white py-2 rounded-lg text-center mt-5'>Agregar saldo</button>
        </div>
        <button className='text-xl block w-[320px] sm:w-[350px] bg-neutral-800 hover:bg-neutral-900 text-white py-2 rounded-lg text-center mt-5'>Asistencia spinning</button>
        <button className='text-xl block w-[320px] sm:w-[350px] bg-neutral-800 hover:bg-neutral-900 text-white py-2 rounded-lg text-center mt-5'>Asistencia musculatura</button>
      </>
    )
  }
}

function TrainerRole({role, user}){
  if(role === 'trainer'){
    return (
      <>
        <button className='text-xl block w-[320px] sm:w-[350px] bg-neutral-800 hover:bg-neutral-900 text-white py-2 rounded-lg text-center'>Realizar pago</button>
      </>
    )
  }
}

function ActionsOverUsers({role, user}) {
  return (
    <div>
      <div className='pt-10 flex items-center flex-col'>
        <h3 className='text-3xl font-bold'>Acciones sobre el usuario</h3>
        <div className='mt-20'></div>
        <AthleteOptions role={role} user={user} />
        <TrainerRole role={role} user={user} />
        <button className='text-xl block w-[320px] sm:w-[350px] bg-red-500 hover:bg-red-700 text-white py-2 rounded-lg text-center mt-5'>Eliminar</button>
      </div>
   </div>
  )
}

export default ActionsOverUsers