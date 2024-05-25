'use client'
import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react'
import { ApiEndpoint } from '@/utils/rest_api_config'
import RestApiClient from '@/utils/rest_api_client'
import Loading from '../Loading'

async function getNewAssistanceToken(setToken){
  try{
    const res = await RestApiClient.get(ApiEndpoint.get_assistance_token)
    setToken(res.data.data.token)
  }catch(err){
    console.log(err)
  }
}

function RightSide() {
  const [assistanceToken, setAssistanceToken] = useState('')
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    getNewAssistanceToken(setAssistanceToken)
    const timer = setInterval(() => {
      setProgress(0)
      getNewAssistanceToken(setAssistanceToken)
    }, 30 * 1000)
    const progressTimer = setInterval(() => {
      setProgress(p => p + 0.1)
    }, 30)
  
    return () => {
      clearInterval(timer)
      clearInterval(progressTimer)
    }
  }, [])
  
  return (
    <div>
      <div className='pt-10 flex items-center flex-col'>
        {
          assistanceToken
          &&
          <QRCode value={assistanceToken} size={200} bgColor="#d5ebd4" />
        }
        {
          !assistanceToken
          &&
          <Loading />
        }
      <div className="w-[300px] rounded-full h-2 bg-black mt-10">
        <div className="bg-white h-2 rounded-full" style={{width: Math.min(progress, 100) + '%'}}></div>
      </div>
      <h3 className='text-3xl mt-10 font-bold'>
        TU CÓDIGO QR
      </h3>
      <p className='text-center text-xl mt-5'>
        Muéstralo en recepción para acceder al gimnasio 
        <br />
        y realizar los pagos correspondientes. </p>
      </div>
    </div>
  )
}

export default RightSide