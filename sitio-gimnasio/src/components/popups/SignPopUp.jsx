import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import DefaultPopupWrapper from './DefaultPopUp'
import { toastErrorMessage } from '@/utils/toastUtils';


export const SignPopUp = ({ onClose, show }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [signUp, setSignUp] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(signUp){
            if(password!== password2){
                toastErrorMessage("Las contraseñas no coinciden.")
                return
            }
            console.log('Email:', email, 'Password:', password, "Password2: ",password2);
        }else{
            console.log('Email:', email, 'Password:', password);
        }
    };
    return (
        <DefaultPopupWrapper onClose={onClose} show={show} centered={true}>
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-20 rounded bg-gray-800" onClick={e => e.stopPropagation()} style={{width: '30vw'}}>
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img src="next.svg" alt="Logo" className='mx-auto' style={{ height: 50, borderRadius: 30 }} />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
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
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${!signUp && "rounded-b-md" } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {signUp && <div>
                                <input
                                    id="password2"
                                    name="password2"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={signUp?"Confirmar contraseña": "Contraseña" }
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                />
                            </div>}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-800"
                            >
                                Log in
                            </button>
                        </div>
                        <div className='flex'>
                            <label className="switch">
                                <input type="checkbox" onChange={event => setSignUp(event.target.checked)} />
                                <span className="slider"></span>
                            </label>
                            <p className='ml-5 text-gray-500 text-sm'>
                                {`Si ${signUp?"ya":"no"} tienes una cuenta${signUp?"":" todavía"}, toca el switch`}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultPopupWrapper>
    )
}
