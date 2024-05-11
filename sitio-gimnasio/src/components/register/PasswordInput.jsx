import React, { useState } from 'react'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'

function PasswordInput({ style, placeholder, value, onChange, id, name, Register = false }) {
    const [show, setShow] = useState(false)
    return (
        <div className='form-control relative'>
            <input
                id={id}
                name={name}
                type={show ? "text" : "password"}
                autoComplete="current-password"
                required
                className={Register ?
                    "border-gray-300 rounded p-2 focus:ring-gray-400 focus:border-gray-500" :
                    "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500" 
                    + `text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${style}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <button onClick={() => setShow(!show)} className="absolute right-2 top-2 focus:outline-none z-10" type="button">
                {show ?
                    <FaEyeSlash color='gray' className='cursor-pointer' size={20}  />
                    :
                    <FaRegEye color='gray' className='cursor-pointer' size={20}  />
                }
            </button>
        </div>
    )
}

export default PasswordInput