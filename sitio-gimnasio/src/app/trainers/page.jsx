"use client"
import React, { useEffect, useState } from 'react'
// import { Html5QrcodeScanner } from 'html5-qrcode'
import QrScanner from '@/components/Scanner'


function Trainers() {
  useEffect(() => {

  }, [])

  return (
    <div>
      Trainers
      <div className='w-[50%]'>
        <QrScanner />
      </div>
      En esta pagina se mostraran filtrados los usuarios con rol entrenador. Se podran filtrar por gimnasio.
      Esta pagina es accesible por todos los usuarios. La vista debe ser similar a /user/list
    </div>
  )
}

export default Trainers