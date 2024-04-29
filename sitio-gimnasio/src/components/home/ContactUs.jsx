import React from 'react'

function ContactUs() {
  return (
    <div className='principal-bg py-10 px-10 md:flex md:flex-row items-center justify-around'>
        <p className='lg:ml-[16vh] ml-10 sm:text-3xl text-2xl text-white'>¿Necesitas <br className='lg:hidden' /> más información?</p>
        <button className='bg-green-100 hover:bg-green-200 py-2 px-8 rounded-3xl sm:text-2xl text-lg mt-5 md:mt-0 ml-10'>
            Contáctanos
        </button>
    </div>
  )
}

export default ContactUs