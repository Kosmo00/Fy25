'use client'
import React, { useState } from 'react'
import { FaBars, FaTimes } from "react-icons/fa";

function NavDropdown({children}) {
    const [nav, setNav] = useState(false);
    return (
        <>
            <div
                onClick={() => setNav(!nav)}
                className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
            >
                {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>
            {
              nav &&
              <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-black to-gray-800 text-gray-500">
                {children}
              </ul>

            }
            
        </>
    )
}

export default NavDropdown