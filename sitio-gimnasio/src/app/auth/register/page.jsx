'use client'
import React, {useState} from 'react'
import { useFormik } from 'formik'
import UploadImage from '@/components/register/UploadImage'
import axios from 'axios'

const validate = values => {
    const errors = {}
    if(!values.name){
        errors.name = 'Campo requerido'
    } else if(values.name.length >= 20){
        errors.name = 'Debe contener menos de 20 caracteres'
    }

    if(!values.lastname){
        errors.lastname = 'Campo requerido'
    } else if(values.name.length >= 20){
        errors.name = 'Debe contener menos de 20 caracteres'
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

function Register() {

    const [image, setImage] = useState(null)

    const formik = useFormik({
        initialValues:{
            name: '',
            lastname: '',
            email: '',
            CI: '',
            phone: '',
            password: '',
            repeat_password: ''
        },
        onSubmit: values => {
            values = {...values, file: image}
            axios.postForm('/api/users', values)
            .then(res => console.log('response', res.data))
            .catch(error => console.error(error));
        } ,
        validate
    })

    const {name, lastname, email, CI, phone, password, repeat_password} = formik.values

    return (
        <div className='flex justify-center pt-10'>
            <div className='card rounded-xl overflow-hidden shadow-lg mb-10'>
                <div className='card-header principal-bg text-white p-3'>
                    <h1 className='text-3xl'>Inscríbete</h1>
                </div>
                <form className='py-5 px-10 bg-neutral-200' onSubmit={formik.handleSubmit}>
                    <div className='card-body grid sm:grid-cols-2'>
                        <div className='sm:ml-10 sm:order-last mb-5'>
                            <UploadImage setImage={setImage} />
                            {!image && <label className='text-red-500 label'>Foto de perfil requerida</label>}
                        </div>
                        <div>

                            <div className='form-control mt-3'>
                                <label className='label' htmlFor="name">Nombre<sup>*</sup></label>
                                <input
                                    id='name'
                                    type='text'
                                    name='name'
                                    className="border-gray-300 rounded p-2 focus:ring-gray-400 focus:border-gray-500"
                                    placeholder="Pedro"
                                    value={name}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.name && <label className='text-red-500 label'>{formik.errors.name}</label>}
                            </div>

                            <div className='form-control mt-3'>
                                <label className='label' htmlFor="lastname">Apellidos<sup>*</sup></label>
                                <input
                                    id='lastname'
                                    type='text'
                                    name='lastname'
                                    className="border-gray-300 rounded p-2 focus:ring-gray-400 focus:border-gray-500"
                                    placeholder="Rodríguez Pérez"
                                    value={lastname}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.lastname && <label className='text-red-500 label'>{formik.errors.lastname}</label>}
                            </div>

                            <div className='form-control mt-3'>
                                <label className='label' htmlFor="email">Correo electrónico<sup>*</sup></label>
                                <input
                                    id='email'
                                    type='email'
                                    name='email'
                                    className="border-gray-300 rounded p-2 focus:ring-gray-400 focus:border-gray-500"
                                    placeholder="ejemplo@gmail.com"
                                    value={email}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.email && <label className='text-red-500 label'>{formik.errors.email}</label>}
                            </div>

                            <div className='form-control mt-3'>
                                <label className='label' htmlFor="CI">Carnet de identidad<sup>*</sup></label>
                                <input
                                    id='CI'
                                    type='text'
                                    name='CI'
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
                                    id='phone'
                                    type='text'
                                    name='phone'
                                    value={phone}
                                    onChange={formik.handleChange}
                                    className="border-gray-300 rounded p-2 focus:ring-gray-400 focus:border-gray-500"
                                    placeholder="55555555"
                                />
                                {formik.errors.phone && <label className='text-red-500 label'>{formik.errors.phone}</label>}
                            </div>

                            <div className='form-control mt-3'>
                                <label className='label' htmlFor="password">Contraseña<sup>*</sup></label>
                                <input
                                    id='password'
                                    type='password'
                                    name='password'
                                    className="border-gray-300 rounded p-2 focus:ring-gray-400 focus:border-gray-500"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className='form-control mt-3'>
                                <label className='label' htmlFor="repeat-password">Repetir contraseña<sup>*</sup></label>
                                <input
                                    id='repeat-password'
                                    type='password'
                                    name='repeat_password'
                                    className="border-gray-300 rounded p-2 focus:ring-gray-400 focus:border-gray-500"
                                    placeholder="Contraseña"
                                    value={repeat_password}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>

                    </div>
                        <button 
                            type='submit'
                            className='bg-neutral-800 hover:bg-neutral-950 text-white font-bold py-3 px-5 rounded-lg font-light mt-5 text-lg bg-green-100'
                        >
                            Enviar
                        </button>
                </form>
            </div>
        </div>
    )
}

export default Register