"use client"
import React, { useState } from 'react'

function CreateUser() {
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [CI, setCI] = useState('')
  const [telefono, setTelefono] = useState('')
  const [foto_perfil, setFoto_perfil] = useState('/wasoski.jpg')
  const [notificaciones_whatsapp, setNotificaciones_whatsapp] = useState(false)
  const [notificaciones_correo, setNotificaciones_correo] = useState(false)
  const [rol, setRol] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='w-[50vw] mx-auto'>
      <h1 className='text-4xl'>Insertar usuario en la plataforma</h1>
      <form className="mt-8 space-y-6"
        // onSubmit={handleSubmit}
        action='POST'>
        <div className="rounded-md shadow-sm -space-y-px">
          <div className='flex flex-col md:flex-row'>
            <div className='w-full md:w-[80%]'>
              <div>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#708064] rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#708064] rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Apellidos"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="CI"
                  name="CI"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#708064] rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Carnet de identidad o pasaporte"
                  value={CI}
                  onChange={(e) => setCI(e.target.value)}
                />
              </div>

              <div>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#708064] rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Teléfono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
            </div>
            <img src={foto_perfil} alt="algo" className='w-[150px] h-[150px] object-cover rounded-xl py-2 mx-auto' />
            {/* Usar este input para el onclick en la foto para cambiar la foto de perfil */}
            <input type="hidden" name="subir fotos" />
          </div>
          <div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#708064] rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              id="password2"
              name="password2"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Repetir contraseña"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <div className='flex p-2'>
            <label className="switch">
              <input type="checkbox"
                onChange={event => setNotificaciones_whatsapp(event.target.checked)}
              />
              <span className="slider"></span>
            </label>
            <p className='ml-5 text-gray-500 text-sm'>
              Notificaciones por whatsapp
            </p>
          </div>
          <div className='flex p-2'>
            <label className="switch">
              <input type="checkbox"
                onChange={event => setNotificaciones_correo(event.target.checked)}
              />
              <span className="slider"></span>
            </label>
            <p className='ml-5 text-gray-500 text-sm'>
              Notificaciones por correo
            </p>
          </div>
        
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-[#404048] focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#9fe01e]"
          >
            Insertar en sistema
          </button>
        </div>
      </form>
      {/* Usuario_admin:            Created: 06/04

      Usuario_entrenador:
      ganancia_sesion_por_cliente (porciento) : number
      monto_ganado : number
      monto_cobrado : number
      información : string
      gimnasio : Gimnasio


      Usuario_recepcion:        Created: 06/04
      gimnasio : Gimnasio

      Usuario_QR:               Created: 06/04
      gimnasio : Gimnasio

      Usuario_atleta:           Created: 06/04
      pago_por_sesion_spinning : number
      pago_por_sesion_musculatura : number
      dinero_ingresado : number
      porciento_rebaja : number
      numero_de_usuario : number */}
    </div>
  )
}

export default CreateUser