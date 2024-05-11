"use client"
import PasswordInput from '@/components/PasswordInput';
import RestApiClient from '@/utils/rest_api_client';
import { ApiEndpoint } from '@/utils/rest_api_config';
import { toastErrorMessage, toastInfoMessage } from '@/utils/toastUtils';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

function page() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    const auth = searchParams.get('auth');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const handleSubmit = async e => {
        e.preventDefault()
        if (password !== password2) {
            toastErrorMessage("Las contraseñas no coinciden");
            return;
        }
        const res = await RestApiClient.put(ApiEndpoint.change_password_api, {
            email,
            id: token,
            password
        }).catch(error => {
            toastErrorMessage(error.response.data.message);
            return;
        })
        if(res.status === 200){
            toastInfoMessage(res.data.message)
        }
        setTimeout(() => {
            window.location.href = "/"
        }, 3000);
    }
    return email && token && auth === "true" ?
        (
            <div className='w-[50%] mx-auto'>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit} action='POST'>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <PasswordInput placeholder={"Contraseña"} setPassword={setPassword} style={"rounded-t-md"} value={password}/>
                        <PasswordInput placeholder={"Confirmar contraseña"} setPassword={setPassword2} style={"rounded-b-md"} value={password2}/>
                    </div>
                    <div >
                        <button
                            type="submit"
                            className="group relative w-[80%] mx-auto flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-[#404048] focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#9fe01e]"
                        >
                            Cambiar Contraseña
                        </button>
                        <button
                            type="button"
                            className="group relative w-[50%] mx-auto mt-5 flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#404048]"
                            onClick={() => window.location.href = "/"}
                        >
                            Cancelar
                        </button>
                    </div>
                    </form>
            </div>
        )
        : <></>
}

export default page