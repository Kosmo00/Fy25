'use client'
import React from 'react'
import { signOut } from 'next-auth/react'

function LogOutBtn() {
    return (
        <span onClick={async () => await signOut()} className="text-[#708064]">Cerrar sesión</span>
    )
}

export default LogOutBtn