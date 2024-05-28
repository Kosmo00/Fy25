'use client'

import React from 'react'
import { useFormik } from 'formik'
import { toastErrorMessage, toastFastInfoMessage } from '@/utils/toastUtils'
import Link from 'next/link'

import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'

const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = 'Campo requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Correo inválido'
    }
    return errors
}

function LoginForm() {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async values => {
            try {
                const res = await signIn('credentials', {email: values.email, password: values.password, callbackUrl: '/', redirect: false})
                if(res.status === 401){
                    toastErrorMessage('Credenciales incorrectas')
                }
                else{
                    toastFastInfoMessage('Autenticación exitosa')
                    router.refresh()
                }
            }
            catch (error) {
                console.log(error)
                toastErrorMessage('Error al iniciar sesión, por favor intente más tarde')
            }
        },
        validate
    })

    const { email, password} = formik.values

    return (
        <form className='py-5 px-10 bg-neutral-200' onSubmit={formik.handleSubmit}>
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
                {formik.errors.password && <label className='text-red-500 label'>{formik.errors.password}</label>}
                <Link className='text-black hover:text-[0.87rem] text-sm mt-3 underline' href='/'>¿Olvidaste tu contraseña?</Link>
            </div>
            <button 
                type='submit'
                className='bg-neutral-800 hover:bg-neutral-950 text-white font-bold py-3 px-5 rounded-lg font-light mt-5 text-lg bg-green-100'
            >Iniciar sesión</button>
            <div className='mt-10'>
                <p>¿No tienes cuenta? <Link className='text-black hover:font-bold underline' href='/auth/register'>Regístrate</Link></p>
            </div>
        </form>
    )
}

export default LoginForm