'use client'
import React, { useState, useEffect } from 'react'
import { toastErrorMessage, toastInfoMessage } from '@/utils/toastUtils'
import { useFormik } from 'formik'
import UploadImage from '@/components/register/UploadImage'
import RestApiClient from '@/utils/rest_api_client'
import { ApiEndpoint } from '@/utils/rest_api_config'

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
  
    if (values.CI.length !== 11 || !/^\d+$/.test(values.CI)) {
      errors.CI = 'Debe contener 11 números'
    }
  
    if (values.phone.length !== 8 || !/^\d+$/.test(values.phone)) {
      errors.phone = 'Debe contener 8 números'
    }
    return errors
  }


function EditUserForm({ user }) {
    const formik = useFormik({
        initialValues: {
          email: user.email,
          name: user.name,
          lastname: user.lastname,
          CI: user.CI,
          phone: user.phone,
          notify_whatsapp: user.notify_whatsapp,
          notify_email: user.notify_email
        },
        onSubmit: async values => {
          if (loading) {
            return
          }
          setLoading(true)
          if(image !== user.profile_image){
              values = { ...values, file: image }
          }
          try {
            const res = await RestApiClient.putForm(ApiEndpoint.create_user, values)
            console.log(values)
            if (res.data.status === 204) {
              toastInfoMessage("Usuario actualizado correctamente")
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
          finally{
            setLoading(false)
          }
        },
        validate
      })

    const { name, lastname, CI, phone, notify_whatsapp, notify_email } = formik.values
    const [image, setImage] = useState(user.profile_image)
    const [loading, setLoading] = useState(false)
    return (
        <form className="py-5 px-10 bg-neutral-200"
        onSubmit={formik.handleSubmit}
        action='POST'>
        <div className='card-body grid sm:grid-cols-2'>
            <div className='sm:ml-10 sm:order-last mb-5'>
                <UploadImage setImage={setImage} image={image} />
                {!image && <label className='text-red-500 label'>Foto de perfil requerida</label>}
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

export default EditUserForm
