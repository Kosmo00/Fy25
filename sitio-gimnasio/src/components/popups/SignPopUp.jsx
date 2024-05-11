import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import DefaultPopupWrapper from './DefaultPopUp'
import { toastErrorMessage } from '@/utils/toastUtils';
import Link from 'next/link';
import PasswordInput from '../register/PasswordInput';


export const SignPopUp = ({ onClose, show }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [signUp, setSignUp] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (signUp) {
            if (password !== password2) {
                toastErrorMessage("Las contraseñas no coinciden.")
                return
            }
            console.log('Email:', email, 'Password:', password, "Password2: ", password2);
        } else {
            console.log('Email:', email, 'Password:', password);
        }
    };

    return (
        <DefaultPopupWrapper onClose={onClose} show={show} centered={true}>
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-20 rounded bg-[#1c1c23] sign-popup-container" onClick={e => e.stopPropagation()}>
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img src="/next.svg" alt="Logo" className='mx-auto' style={{ height: 50, borderRadius: 30 }} />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#9fe01e]">
                            {signUp ? "Registrarse" : "Iniciar sesión"}
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit} action='POST'>
                        <div className="rounded-md shadow-sm -space-y-px">
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
                                <PasswordInput placeholder={"Contraseña"} setPassword={setPassword} style={!signUp && "rounded-b-md"} value={password} />
                            </div>
                            {signUp && <div>
                                <PasswordInput placeholder={"Confirmar contraseña"} setPassword={setPassword2} style={"rounded-b-md"} value={password2} />
                            </div>}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-[#404048] focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#9fe01e]"
                            >
                                {signUp ? "Registrarte" : "Iniciar sesión"}
                            </button>
                        </div>
                        <div>
                            {!signUp && <Link href="/auth/lost_password" className='text-gray-500 text-sm' onClick={() => onClose()}>
                                Olvidó su contraeña, click aquí
                            </Link>}

                        </div>
                        <div className='flex'>
                            <label className="switch">
                                <input type="checkbox" onChange={event => setSignUp(event.target.checked)} />
                                <span className="slider"></span>
                            </label>
                            <p className='ml-5 text-gray-500 text-sm'>
                                {`Si ${signUp ? "ya" : "no"} tienes una cuenta${signUp ? "" : " todavía"}, toca el switch`}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultPopupWrapper>
    )
}
