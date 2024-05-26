import Link from "next/link";
import React from "react";
import { FaCircleNotch } from "react-icons/fa";
import NavDropdown from "./navbar/NavDropdown";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import LogOutBtn from "./navbar/LogOutBtn";

export const NavbarLinks = async () => {
  const session = await getServerSession(authOptions)
  if(session?.user){
    const is_user_list_page_auth_role = session?.user?.role === 'admin' || session?.user?.role === 'reception'
    return(
      <>
        {
          is_user_list_page_auth_role
          &&
          <Link href='/user/list' className="cursor-pointer hover:scale-105 duration-100 mx-3 text-[#708064]">
            Usuarios
          </Link>
        }
        <li className="nav-links px-5 cursor-pointer hover:scale-105 duration-100">
          <LogOutBtn />
        </li>
        <Link href='/user/profile' className="cursor-pointer hover:scale-105 duration-100 mx-3 text-[#708064]">
          Mi perfil
        </Link>
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

const Navbar = async () => {
  return (
    <div className="flex justify-between items-center w-full px-4 bg-[#1c1c23] fixed z-[5] shadow-lg">
      <div>
        <h1 className="font-signature ml-2 my-2">
          <a className="hover:transition ease-in-out text-white" href="/">
            <FaCircleNotch size={50} />
          </a>
        </h1>
      </div>
      <div className="flex">
        <ul className="hidden md:flex">
          <NavbarLinks />
        </ul>
        <NavDropdown>
          <NavbarLinks />
        </NavDropdown>
      </div>
    </div>
  );
};

export default Navbar;