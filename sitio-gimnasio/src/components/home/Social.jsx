import React from 'react'
import { LiaFacebookF } from "react-icons/lia";
import { TiSocialInstagram } from "react-icons/ti";

function Social() {
  return (
    <div className='p-3 bg-black flex justify-center items-center'>
        <div className='bg-white rounded-full p-1 mr-5'>
            <LiaFacebookF className='text-2xl' />
        </div>
        <div className='bg-white rounded-full p-1'>
            <TiSocialInstagram className='text-2xl' />
        </div>
    </div>
  )
}

export default Social
