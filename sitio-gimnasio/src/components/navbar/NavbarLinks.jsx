import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import LogOutBtn from "./LogOutBtn";
import Link from "next/link";

export const NavbarLinks = async () => {
    const session = await getServerSession(authOptions)
    if(session?.user){
      return(
        <>
          <li className="nav-links px-5 cursor-pointer hover:scale-105 duration-100">
            <LogOutBtn />
          </li>
          <li className="nav-links px-5 cursor-pointer hover:scale-105 duration-100 text-[#708064]">
            Mi perfil
          </li>
        </>
      )
    }
    else{
      return (
        <>
          <Link href='/auth/login' className="cursor-pointer hover:scale-105 duration-100 mx-3 text-[#708064]">
            Iniciar sesión
          </Link>
          <Link href='/auth/register' className="cursor-pointer hover:scale-105 duration-100 mx-3 text-[#708064]">
            Regístrate
          </Link>
        </>
      )
    }
  }

export default NavbarLinks