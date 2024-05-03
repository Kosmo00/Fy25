'use client'
import React, {useState} from 'react'
import { useFormik } from 'formik'
import UploadImage from '@/components/register/UploadImage'

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
            console.log('values', JSON.stringify(values))
            fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: values
            }) 
            .then(response => response.json())
            .then(data => console.log('response', data))
            .catch(error => console.error(error));
        } 
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
                        <div className='sm:ml-10 sm:order-last'>
                            <UploadImage setImage={setImage} />

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
                            </div>

                            <div className='form-control'>
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
                                    placeholder="55 555555"
                                />
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