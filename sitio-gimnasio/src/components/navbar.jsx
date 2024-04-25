"use client"
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes, FaCircleNotch } from "react-icons/fa";
import { SignPopUp } from "./popups/SignPopUp";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [openSignPopUp, setOpenSignPopUp] = useState(false)
  const links = [
    {
      id: 1,
      link: "home",
    }
  ];

  return (
    <div className="flex justify-between items-center w-full px-4 text-white bg-black fixed nav z-10">
      <div>
        <h1 className="font-signature ml-2 my-2">
          <a className="hover:transition ease-in-out text-white" href="/">
            <FaCircleNotch size={50} />
          </a>
        </h1>
      </div>
      <div className="flex">
        <ul className="hidden md:flex">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="nav-links px-5 cursor-pointer hover:scale-105 duration-100"
            >
              <Link href={link} className="text-white">{link}</Link>
            </li>
          ))}
        </ul>
        <div className="cursor-pointer hover:scale-105 duration-100" onClick={() => setOpenSignPopUp(true)}>
          Iniciar sesion
        </div>
        { <SignPopUp onClose={() => setOpenSignPopUp(false)} show={openSignPopUp}/>}
      </div>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} className="text-white" href={link}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;