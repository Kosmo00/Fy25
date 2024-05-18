"use client"
import UploadImage from '@/components/register/UploadImage'
import { toastErrorMessage, toastInfoMessage } from '@/utils/toastUtils'
import { useFormik, Form } from 'formik'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const validate = values => {
  const errors = {}
  if (!values.nombre) {
    errors.nombre = 'Campo requerido'
  } else if (values.nombre.length >= 20) {
    errors.nombre = 'Debe contener menos de 20 caracteres'
  }

  if (!values.apellidos) {
    errors.apellidos = 'Campo requerido'
  } else if (values.apellidos.length >= 20) {
    errors.apellidos = 'Debe contener menos de 20 caracteres'
  }

  if (!values.email) {
    errors.email = 'Campo requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Correo inválido'
  }

  if (values.CI.length !== 11 || !/^\d+$/.test(values.CI)) {
    errors.CI = 'Debe contener 11 números'
  }

  if (values.telefono.length !== 8 || !/^\d+$/.test(values.telefono)) {
    errors.telefono = 'Debe contener 8 números'
  }

  if (values.password.length < 8) {
    errors.password = 'Debe tener más de 7 caracteres'
  } else if (values.password !== values.password2) {
    errors.password2 = 'Las contraseñas no coinciden'
  }
  // if (typeof values.notificaciones_whatsapp === 'boolean') {
  //   errors.notificaciones_whatsapp = 'Campo requeridoaa'
  // }

  // if (typeof values.notificaciones_correo === 'boolean') {
  //   errors.notificaciones_correo = 'Campo requerido s'
  // }
  return errors
}

function CreateUser() {

  const [foto_perfil, setFoto_perfil] = useState('/placeholders/profile.jpg')
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellidos: "",
      email: "",
      CI: "",
      telefono: "",
      password: "",
      rol: "",
      password2: "",
      notificaciones_whatsapp: false,
      notificaciones_correo: false
    },
    onSubmit: async values => {
      if (loading) {
        return
      }
      setLoading(true)
      values = { ...values, file: foto_perfil }
      try {
        // const res = await RestApiClient.postForm(ApiEndpoint.register, values)
        console.log(values)
        // if (res.data.status === 201) {
        //   toastInfoMessage("Usuario creado correctamente")
        //   // await signIn('credentials', { email: values.email, password: values.password, callbackUrl: '/auth/register/verify_email' })
        // } else {
        //   toastErrorMessage(res.data.message)
        //   if (res.data.message === "Campos duplicados") {
        //     toastErrorMessage(res.data.data.fields.map(field => `El campo ${field} ya existe`).join(", "))
        //   }
        //   setLoading(false)
        // }
      }
      catch (error) {
        console.log(error)
        setLoading(false)
        toastErrorMessage("Error")
      }
    },
    validate
  })

  const { nombre, apellidos, email, CI, telefono, password, rol, password2, notificaciones_whatsapp, notificaciones_correo } = formik.values
  const { data: session } = useSession();
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    if (session) {
      if (session.user.role === 'admin' || session.user.role === 'reception') {
        setVisible(true)
        console.log('Usuario es un administrador');
        // Aquí puedes realizar acciones específicas para administradores
      } else {
        window.location.href = '/';
      }
    } else {
      window.location.href = '/auth/login'
    }
  }, [session]);
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    visible &&
    <div className='w-[50vw] mx-auto'>
      <h1 className='text-4xl'>Insertar usuario en la plataforma</h1>
      <form className="mt-8"
        // onSubmit={handleSubmit}
        onSubmit={formik.handleSubmit}
        action='POST'>
        <div>
          <div className='flex flex-col md:flex-row'>
            <div className='w-full md:w-[80%]'>
              <div className='my-1'>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#708064]  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={formik.handleChange}
                // onChange={(e) => setNombre(e.target.value)}
                />
                {formik.errors.nombre && <label className='text-red-500 label'>{formik.errors.nombre}</label>}
              </div>
              <div className='my-1'>
                <input
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#708064]  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Apellidos"
                  value={apellidos}

                  onChange={formik.handleChange}
                // onChange={(e) => setApellidos(e.target.value)}
                />
                {formik.errors.apellidos && <label className='text-red-500 label'>{formik.errors.apellidos}</label>}
              </div>
              <div className='my-1'>
                <input
                  id="CI"
                  name="CI"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#708064]  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Carnet de identidad o pasaporte"
                  value={CI}

                  onChange={formik.handleChange}
                // onChange={(e) => setCI(e.target.value)}
                />
                {formik.errors.CI && <label className='text-red-500 label'>{formik.errors.CI}</label>}
              </div>

              <div className='my-1'>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#708064]  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Teléfono"
                  value={telefono}

                  onChange={formik.handleChange}
                // onChange={(e) => setTelefono(e.target.value)}
                />
                {formik.errors.telefono && <label className='text-red-500 label'>{formik.errors.telefono}</label>}
              </div>
            </div>
            <div className='m-1 h-[170px]'>
              <UploadImage setImage={setFoto_perfil} dontShowTopLabel={true} />
            </div>
            {/* <img src={foto_perfil} alt="algo" className='h-[170px] rounded-xl py-1 mx-1 ' /> */}
            {/* <input type="hidden" name="subir fotos" /> */}
          </div>
          <div className='my-1'>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#708064]  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
              value={email}

              onChange={formik.handleChange}
            // onChange={(e) => setEmail(e.target.value)}
            />
            {formik.errors.email && <label className='text-red-500 label'>{formik.errors.email}</label>}
          </div>
          <div className='my-1'>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              placeholder="Contraseña"
              value={password}

              onChange={formik.handleChange}
            // onChange={(e) => setPassword(e.target.value)}
            />
            {formik.errors.password && <label className='text-red-500 label'>{formik.errors.password}</label>}
          </div>
          <div className='my-1'>
            <input
              id="password2"
              name="password2"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Repetir contraseña"
              value={password2}

              onChange={formik.handleChange}
            // onChange={(e) => setPassword2(e.target.value)}
            />
            {formik.errors.password2 && <label className='text-red-500 label'>{formik.errors.password2}</label>}

          </div>
          <div className='flex p-2'>
            <label className="switch">
              <input type="checkbox"
                id='notificaciones_whatsapp'
                name='notificaciones_whatsapp'
                checked={notificaciones_whatsapp}
                onChange={formik.handleChange}
              />
              <span className="slider"></span>
            </label>

            <p className='ml-5 text-gray-500 text-sm'>
              Notificaciones por whatsapp
            </p>
          </div>
          {formik.errors.notificaciones_whatsapp && <label className='text-red-500 label'>{formik.errors.notificaciones_whatsapp}</label>}
          <div className='flex p-2'>
            <label className="switch">
              <input type="checkbox"
                id='notificaciones_correo'
                name='notificaciones_correo'
                checked={notificaciones_correo}
                onChange={formik.handleChange}
              />
              <span className="slider"></span>
            </label>
            <p className='ml-5 text-gray-500 text-sm'>
              Notificaciones por correo
            </p>
          </div>
          {formik.errors.notificaciones_correo && <label className='text-red-500 label'>{formik.errors.notificaciones_correo}</label>}


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

    </div>
  )
}

export default CreateUser