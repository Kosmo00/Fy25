"use client"
import PasswordInput from '@/components/register/PasswordInput';
import RestApiClient from '@/utils/rest_api_client';
import { ApiEndpoint } from '@/utils/rest_api_config';
import { toastErrorMessage, toastFastInfoMessage, toastInfoMessage } from '@/utils/toastUtils';
import { useFormik } from 'formik';
import { getServerSession } from 'next-auth';
import { SessionContext, useSession } from 'next-auth/react';
import React from 'react'


const validate = values => {
    const errors = {}
    if (values.password !== values.password2) {
        errors.password2 = "Las contraseñas no coinciden";
    }
    return errors
}

const page = () => {

    const session = useSession()
    const formik = useFormik({
        initialValues: {
            password: '',
            password2: ''
        },
        onSubmit: async values => {
            try {
                const res = await RestApiClient.put(ApiEndpoint.change_password_api, {
                    email: session.data.user.email,
                    password: values.password
                })
                if (res.status === 200) {
                    toastInfoMessage(res.data.message)
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 3000);
                } else {
                    toastErrorMessage('Error al cambiar de contraseña, por favor intente más tarde')
                }
            }
            catch (error) {
                console.log(error)
                toastErrorMessage('Error al cambiar de contraseña, por favor intente más tarde')
            }
        },
        validate
    })
    const { password, password2 } = formik.values
    return (
        < div className='w-[50%] mx-auto' >
            <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit} action='POST'>
                <div className="rounded-md shadow-sm -space-y-px">
                    <PasswordInput id={"password"} name={"password"} placeholder={"Contraseña"} onChange={formik.handleChange} style={"rounded-t-md"} value={password} />
                    <PasswordInput id={"password2"} name={"password2"} placeholder={"Confirmar contraseña"} onChange={formik.handleChange} style={"rounded-b-md"} value={password2} />
                    {formik.errors.password2 && <label className='text-red-500 label'>{formik.errors.password2}</label>}
                </div>
                <div>
                    <button
                        type="submit"
                        className="group relative w-[80%] mx-auto flex justify-center py-3 px-4 border border-transparent text-xl font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-neutral-800 hover:bg-neutral-950"
                    >
                        Cambiar Contraseña
                    </button>
                    <button
                        type="button"
                        className="group relative w-[50%] mx-auto mt-5 flex justify-center py-3 px-4 border border-transparent text-xl font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-500"
                        onClick={() => window.location.href = "/"}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default page