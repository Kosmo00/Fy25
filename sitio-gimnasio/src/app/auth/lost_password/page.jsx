"use client"
import RestApiClient from '@/utils/rest_api_client'
import { ApiEndpoint } from '@/utils/rest_api_config'
import { toastErrorMessage, toastInfoMessage } from '@/utils/toastUtils'
import React, { useState } from 'react'

function page() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await RestApiClient.post(ApiEndpoint.change_password_api, { email })
      .catch(err => {
        toastErrorMessage(err.response.data.message);
      })
    if(res.status === 200){
      toastInfoMessage(res.data.message)
    }else{
      console.log(res.data)
    }
  }
  return (
    <div className='flex items-center justify-center'>
      {!sent && <form className='space-y-6 mt-8' onSubmit={handleSubmit}>
        <p className='text-center'>
          Introduzca la dirección de email con la que creó su cuenta
        </p>
        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className='w-full px-3 py-2 rounded-md' required />
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-[#404048] focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#9fe01e]"
        >
          Enviar
        </button>
      </form>}
    </div>
  )
}

export default page