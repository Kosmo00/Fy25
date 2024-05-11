'use client'
import React, { useState } from 'react'
import { FaBars, FaTimes } from "react-icons/fa";

function NavDropdown() {
    const [nav, setNav] = useState(false);
    return (
        <>
            <div
                onClick={() => setNav(!nav)}
                className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
            >
                {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>

            
        </>
    )
}

export default NavDropdown