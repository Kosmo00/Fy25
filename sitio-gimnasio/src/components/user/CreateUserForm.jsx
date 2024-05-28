'use client'
import React, { useState, useEffect } from 'react'
import { toastErrorMessage, toastInfoMessage } from '@/utils/toastUtils'
import { useFormik } from 'formik'
import UploadImage from '@/components/register/UploadImage'
import Select from 'react-select';
import PasswordInput from '../register/PasswordInput'
import RestApiClient from '@/utils/rest_api_client'
import { ApiEndpoint } from '@/utils/rest_api_config'

const selectValues = [
  { value: 'athlethe', label: 'Atleta' },
  { value: 'trainer', label: 'Entrenador' },
  { value: 'admin', label: 'Administrador' },
  { value: 'reception', label: 'Recepcionista' },
  { value: 'qr-scanner', label: 'Scan QR' },
]

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Campo requerido'
  } else if (values.name.length >= 20) {
    errors.name = 'Debe contener menos de 20 caracteres'
  }

  if (!values.lastname) {
    errors.lastname = 'Campo requerido'
  } else if (values.lastname.length >= 20) {
    errors.lastname = 'Debe contener menos de 20 caracteres'
  }

  if (!values.email) {
    errors.email = 'Campo requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Correo inválido'
  }

  if (values.CI.length !== 11 || !/^\d+$/.test(values.CI)) {
    errors.CI = 'Debe contener 11 números'
  }

  if (values.phone.length !== 8 || !/^\d+$/.test(values.phone)) {
    errors.phone = 'Debe contener 8 números'
  }
  return errors
}


function CreateUserForm({ authenticated_role }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      CI: "",
      phone: "",
      password: "",
      notify_whatsapp: false,
      notify_email: false
    },
    onSubmit: async values => {
      if (loading) {
        return
      }
      setLoading(true)
      values = { ...values, file: image, role: selectedRole.value }
      try {
        const res = await RestApiClient.postForm(ApiEndpoint.create_user, values)
        console.log(values)
        if (res.data.status === 201) {
          toastInfoMessage("Usuario creado correctamente")
        } else {
          toastErrorMessage(res.data.message)
          if (res.data.message === "Campos duplicados") {
            toastErrorMessage(res.data.data.fields.map(field => `El campo ${field} ya existe`).join(", "))
          }
        }
      }
      catch (error) {
        console.log(error)
        toastErrorMessage("Error")
      }
      finally {
        setLoading(false)
      }
    },
    validate
  })

  // Must be deleted once
  // https://github.com/JedWatson/react-select/issues/5459 is fixed.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const { name, lastname, email, CI, phone, password, notify_whatsapp, notify_email } = formik.values
  const [image, setImage] = useState('/placeholders/profile.jpg')
  const [selectedRole, setSelectedRole] = useState(selectValues[0]);
  const [loading, setLoading] = useState(false)
  return (
    <form className="py-5 px-10 bg-neutral-200"
      onSubmit={formik.handleSubmit}
      action='POST'>
      <div className='card-body grid sm:grid-cols-2'>
        <div className='sm:ml-10 sm:order-last mb-5'>
          <UploadImage setImage={setImage} />
          {!image && <label className='text-red-500 label'>Foto de perfil requerida</label>}
          <div className='mt-6'>
            {
              authenticated_role === 'admin' &&
              <>
                <label className='label' htmlFor="role">Rol<sup>*</sup></label>
                {isMounted &&
                  <div>
                    <Select
                      id='role'
                      defaultValue={selectValues[0]}
                      options={selectValues}
                      onChange={setSelectedRole}
                      name='role'
                    />
                  </div>
                }
              </>
            }
          </div>
        </div>
        <div>
          <div className='form-control mt-3'>
            <label className='label' htmlFor="name">Nombre<sup>*</sup></label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="border-gray-300 rounded p-2 focus:ring-gray-400 focus:border-gray-500"
              placeholder="Nombre"
              value={name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && <label className='text-red-500 label'>{formik.errors.name}</label>}
          </div>
          <div className='form-control mt-3'>
            <label className='label' htmlFor="lastname">Apellidos<sup>*</sup></label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              required
              className="border-gray-300 rounded p-2 focus:ring-gray-400 focus:border-gray-500"
              placeholder="Apellidos"
              value={lastname}
              onChange={formik.handleChange}
            />
            {formik.errors.lastname && <label className='text-red-500 label'>{formik.errors.lastname}</label>}
          </div>
          <div className='form-control mt-3'>
            <label className='label' htmlFor="CI">Carnet de identidad<sup>*</sup></label>
            <input
              id="CI"
              name="CI"
              type="text"
              required
              className="border-gray-300 rounded p-2 focus:ring-gray-400 focus:border-gray-500"
              placeholder="99031287878"
              value={CI}
              onChange={formik.handleChange}
            />
            {formik.errors.CI && <label className='text-red-500 label'>{formik.errors.CI}</label>}
          </div>
          <div className='form-control mt-3'>
            <label className='label' htmlFor="phone">Teléfono<sup>*</sup></label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="border-gray-300 rounded p-2 focus:ring-gray-400 focus:border-gray-500"
              placeholder="55555555"
              value={phone}
              onChange={formik.handleChange}
            />
            {formik.errors.phone && <label className='text-red-500 label'>{formik.errors.phone}</label>}
          </div>
          <div className='form-control mt-3'>
            <label className='label' htmlFor="email">Correo electrónico<sup>*</sup></label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="border-gray-300 rounded p-2 focus:ring-gray-400 focus:border-gray-500"
              placeholder="ejemplo@gmail.com"
              value={email}

              onChange={formik.handleChange}
            />
            {formik.errors.email && <label className='text-red-500 label'>{formik.errors.email}</label>}
          </div>
          {
            authenticated_role === 'admin' &&
            <div className='form-control mt-3'>
              <label className='label' htmlFor="password">Contraseña<sup>*</sup></label>
              <PasswordInput
                id='password'
                name='password'
                style="border-gray-300 rounded p-2 focus:ring-gray-400 focus:border-gray-500"
                placeholder="Contraseña"
                value={password}
                onChange={formik.handleChange}
              />
            </div>
          }
          <div className='flex p-2 mt-5'>
            <label className="switch">
              <input type="checkbox"
                id='notify_whatsapp'
                name='notify_whatsapp'
                checked={notify_whatsapp}
                onChange={formik.handleChange}
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
                id='notify_email'
                name='notify_email'
                checked={notify_email}
                onChange={formik.handleChange}
              />
              <span className="slider"></span>
            </label>
            <p className='ml-5 text-gray-500 text-sm'>
              Notificaciones por correo
            </p>
          </div>
          {formik.errors.notify_email && <label className='text-red-500 label'>{formik.errors.notify_email}</label>}
        </div>
      </div>
      <div>
        <button
          type='submit'
          className='bg-neutral-800 hover:bg-neutral-950 text-white font-bold py-3 px-5 rounded-lg font-light mt-5 text-lg'
        >
          {loading && 'Agregando...'}
          {!loading && 'Agregar'}
        </button>
      </div>

    </form>
  )
}

export default CreateUserForm
