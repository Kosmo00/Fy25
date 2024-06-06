"use client"
import PasswordInput from '@/components/register/PasswordInput';
import RestApiClient from '@/utils/rest_api_client';
import { ApiEndpoint } from '@/utils/rest_api_config';
import { toastErrorMessage, toastInfoMessage } from '@/utils/toastUtils';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { useParams, useSearchParams } from 'next/navigation';
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
    const email = useSearchParams().get("email");
    const formik = useFormik({
        initialValues: {
            password: '',
            password2: ''
        },
        onSubmit: async values => {
            try {
                const res = await RestApiClient.put(ApiEndpoint.change_password_api, {
                    email: email ?? session.data.user.email,
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
        <div className='flex justify-center pt-10'>
            <div className='card rounded-xl overflow-hidden shadow-2xl mb-10 sm:w-96 w-80'>
                <div className='card-header principal-bg text-white p-3'>
                    <h1 className='text-3xl'>Cambiar contraseña</h1>
                </div>

                < div className='w-[80%] mx-auto' >
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
                                className="group relative w-[50%] mx-auto mt-5 flex justify-center py-3 px-4 border border-transparent text-xl font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-500 mb-5"
                                onClick={() => window.location.href = "/"}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page