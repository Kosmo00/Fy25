import React from 'react'
import { FaFacebookSquare } from 'react-icons/fa';
import { GrInstagram } from "react-icons/gr";

function Social() {
  return (
    <div className='p-3 principal-bg flex justify-center items-center'>
        <div className='bg-white rounded-full p-1 mr-5 cursor-pointer'>
            <FaFacebookSquare className='text-2xl text-blue-800' />
        </div>
        <div className='bg-white rounded-full p-1 cursor-pointer'>
            <GrInstagram className='text-2xl text-orange-800'/>
        </div>
    </div>
  )
}

export default Social
